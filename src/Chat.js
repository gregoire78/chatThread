import React, { useEffect } from 'react';
import { observer, useLocalStore } from 'mobx-react';
import _ from 'lodash';
import ReactTooltip from 'react-tooltip';
import chroma from 'chroma-js';
import { formatText } from 'parse-msg';

const defaultColors = _.shuffle([
    "#FF0000",
    "#0000FF",
    "#00FF00",
    "#B22222",
    "#FF7F50",
    "#9ACD32",
    "#FF4500",
    "#2E8B57",
    "#DAA520",
    "#D2691E",
    "#5F9EA0",
    "#1E90FF",
    "#FF69B4",
    "#8A2BE2",
    "#00FF7F"
]);

function formatTipForBadge(badgeUser, chatThread) {
    let text = "";
    switch (badgeUser.id) {
        case "subscriber":
            text = `Abonné depuis ${chatThread.badgeInfo.subscriber} mois`
            break;

        case "founder":
            text = `Fondateur, abonné depuis ${chatThread.badgeInfo.founder} mois`
            break;

        default:
            text = badgeUser.title
            break;
    }
    return text;
}

function getUserColor(login) {
    const n = login.charCodeAt(0) + login.charCodeAt(login.length - 1);
    return defaultColors[n % defaultColors.length]
}

function convertUserColor(user) {
    let color = user.color;
    if (!color) {
        color = getUserColor(user);
    }
    let contrast = chroma.contrast('rgb(24, 24, 27)', color);
    if (contrast < 4.5) {
        color = chroma(color).brighten(4.5 - contrast).hex();
        //console.log(contrast, 4.5 - contrast, chroma.contrast('black', color))
    }
    return color;
}

function Chat() {
    const mystore = useLocalStore(() => ({
        chatThread: [],
        autoScroll: true,
    }));
    useEffect(() => {
        document.body.style.margin = "10px";
        document.body.style.background = "#18181b";
        document.body.style.color = "#efeff1";
        window.scrollTo(0, document.body.scrollHeight);
        window.addEventListener("message", (e) => {
            if (e.data.source === "app" && e.data.props) {
                ReactTooltip.rebuild();
                document.title = e.data.props.title;
                mystore.chatThread = e.data.props.chatThreadChannel
            }
            if (mystore.autoScroll) {
                window.scrollTo(0, document.body.scrollHeight);
            }
        }, false);
        const scroll = (e) => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                mystore.autoScroll = true;
            } else {
                mystore.autoScroll = false;
            }
        }
        window.addEventListener('wheel', scroll, true);
        window.addEventListener('touchmove', scroll, true);
        window.addEventListener('touchend', scroll, true);
        window.addEventListener("resize", () => {
            window.scrollTo(0, document.body.scrollHeight);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="chat-thread" style={{ fontFamily: "Roobert,Helvetica Neue,Helvetica,Arial,sans-serif" }}>
            {mystore.chatThread.length > 0 && mystore.chatThread.map((chatThread) =>
                <p key={chatThread.id} style={{ overflowWrap: "break-word", margin: "10px 0", lineHeight: "1.5em" }}>
                    <small style={{ color: "grey", verticalAlign: "middle", marginRight: 5 }}>
                        {chatThread.ts}
                    </small>
                    {chatThread.badgesUser && <span>{chatThread.badgesUser.map((badgeUser, k) =>
                        <img style={{ verticalAlign: "middle", marginRight: 3 }}
                            key={k} src={badgeUser && badgeUser.image_url_1x}
                            alt=""
                            data-tip={formatTipForBadge(badgeUser, chatThread)} />
                    )}</span>}
                    <span style={{ color: convertUserColor(chatThread.userName), fontWeight: "bold", verticalAlign: "middle" }}>{chatThread.displayName}</span>&nbsp;
                    <span style={{ verticalAlign: "middle" }} dangerouslySetInnerHTML={{ __html: formatText(chatThread.parsed) }} />
                </p>
            )}
            <ReactTooltip type="light" id="emote" scrollHide={false} place="top" border={true} className="emote-preview" getContent={datumAsText => {
                if (datumAsText == null) {
                    return;
                }
                let v = JSON.parse(datumAsText);
                return (
                    <><img src={v.src} alt="" /><p>{v.title}</p></>
                );
            }} />
            <ReactTooltip border={true} type="light" scrollHide={false} className="emote-preview tip" effect="solid" place="top" />
        </div>
    )
}

export default observer(Chat);