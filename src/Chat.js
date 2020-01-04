import React, { useEffect } from 'react';
import { observer, useLocalStore } from 'mobx-react';
import _ from 'lodash';
import ReactTooltip from 'react-tooltip';

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

function formatEmotes(text, emotes) {
    var splitText = text.split('');
    for (var i in emotes) {
        var e = emotes[i];
        for (var j in e) {
            var mote = e[j];
            if (typeof mote == 'string') {
                mote = mote.split('-');
                mote = [parseInt(mote[0]), parseInt(mote[1])];
                var length = mote[1] - mote[0],
                    empty = Array.apply(null, new Array(length + 1 + 1)).map(function () { return '' });
                splitText = splitText.slice(0, mote[0]).concat(empty).concat(splitText.slice(mote[1] + 1 + 1, splitText.length));
                var datajson = { src: `http://static-cdn.jtvnw.net/emoticons/v1/${i}/3.0`, title: text.slice(mote[0], mote[1] + 1).replace(/[\u00A0-\u9999<>&]/gim, function (i) { return '&#' + i.charCodeAt(0) + ';'; }) }
                //splitText.splice(mote[0], 1, `<div style="height: 28px;vertical-align: middle;display: inline-block;margin: -.5% 0;position: relative;"><img data-for="emote" data-tip=${JSON.stringify(datajson)} style="position: relative;top: 50%;left: 50%;transform: translate(-50%, -50%);" class="emoticon" alt="${datajson.title}" src="http://static-cdn.jtvnw.net/emoticons/v1/${i}/1.0"></div> `);
                splitText.splice(mote[0], 1, `<div data-for="emote" style="height: 1em;vertical-align: middle;display: inline-flex;align-items: center;justify-content: center;"><img data-for="emote" data-tip=${JSON.stringify(datajson)} class="emoticon" alt="${datajson.title}" src="http://static-cdn.jtvnw.net/emoticons/v1/${i}/1.0"></div> `);
            }
        }
    }
    return splitText.join('').replace(/(<img\s[^>]*>)(?: )(?=<)/igm, "$1").replace(/(?:^|\s)((?:http|https|ftp|ftps):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?)/g, " <a href=$1 target='_blank' style='color: white;vertical-align: middle;'>$1</a>");
}

function getUserColor(login) {
    const n = login.charCodeAt(0) + login.charCodeAt(login.length - 1);
    return defaultColors[n % defaultColors.length]
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
                            data-tip={(badgeUser.id === "subscriber" && `Abonné depuis ${chatThread.user['badge-info'].subscriber} mois`) || (badgeUser.id === "founder" && `Fondateur, abonné depuis ${chatThread.user['badge-info'].founder} mois`) || badgeUser.title} />
                    )}</span>}
                    <span style={{ color: chatThread.user.color || getUserColor(chatThread.user.username), fontWeight: "bold", verticalAlign: "middle" }}>{chatThread.user["display-name"]}</span>&nbsp;
                    <span style={chatThread.user["message-type"] === "action" ? { color: chatThread.user.color, verticalAlign: "middle" } : { verticalAlign: "middle" }} dangerouslySetInnerHTML={{ __html: formatEmotes(chatThread.message, chatThread.user.emotes) }} />
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