import React, { useEffect, useRef } from 'react';
import { observer, useLocalStore } from 'mobx-react';
import _ from 'lodash';
import Tippy from '@tippyjs/react';
import { followCursor } from 'tippy.js/headless'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import chroma from 'chroma-js';
import { parseUrls } from 'parse-msg';
import axios from "axios";

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
            text = <b>Abonné depuis {chatThread.badgeInfo.subscriber} mois</b>
            break;

        case "founder":
            text = <b>Fondateur, abonné depuis {chatThread.badgeInfo.founder} mois</b>
            break;

        default:
            text = <b>{badgeUser.title}</b>
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
        color = getUserColor(user.userName);
    }
    let contrast = chroma.contrast('rgb(24, 24, 27)', color);
    if (contrast < 4.5) {
        color = chroma(color).brighten(4.5 - contrast).hex();
        //console.log(contrast, 4.5 - contrast, chroma.contrast('black', color))
    }
    return color;
}
function preloadImage(url) {
    var img = new Image();
    img.src = url;
    return url
}
function Chat() {
    const mystore = useLocalStore(() => ({
        chatThread: [],
        autoScroll: true,
        audio: [],
        activeAudio: false,
        title: ''
    }));
    const player = useRef(new Audio())

    const getTts = async (text) => {
        return await (await axios.post(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.REACT_APP_TTS}`, {
            input: {
                ssml: '<speak>' + text + '</speak>'
            },
            voice: {
                languageCode: "fr-FR",
                name: 'fr-FR-Wavenet-A',
                ssmlGender: "FEMALE"
            },
            audioConfig: {
                audioEncoding: "OGG_OPUS",
                speakingRate: "1"
            }
        })).data
    }

    let interval
    const playsound = async (init = false) => {
        if (init) startTcl();
        if (mystore.audio.length > 0 && player.current.paused) {
            clearInterval(interval)
            const message = mystore.audio.shift() //_.find(mystore.chatThread, { 'id': mystore.audio.shift() });
            const tts = await getTts(`${message.message.replace(/merde/g, '<say-as interpret-as="expletive">merde</say-as>')}`.replace(/_/g, ' '));
            player.current.src = 'data:audio/mpeg;base64,' + tts.audioContent
            player.current.play().then(_ => { })
                .catch(error => {
                    console.log(error, tts, message);
                    if (mystore.audio.length > 0) {
                        playsound();
                    } else {
                        startTcl();
                    }
                });
        }
    }
    const startTcl = () => interval = setInterval(() => playsound(), 100);

    useEffect(() => {
        player.current.volume = 0.4;
        player.current.onended = () => {
            if (mystore.audio.length > 0) {
                playsound();
            } else {
                startTcl();
            }
        }
        if (mystore.activeAudio) startTcl()
        document.body.style.margin = "10px";
        document.body.style.background = "#18181b";
        document.body.style.color = "#efeff1";
        window.scrollTo(0, document.body.scrollHeight);
        window.addEventListener("message", async (e) => {
            if (e.data.source === "app" && e.data.props) {
                mystore.title = e.data.props.title
                document.title = e.data.props.title
                mystore.chatThread = e.data.props.chatThreadChannel
            }
            if (e.data.source === "app-single" && e.data.props) {
                mystore.chatThread = [...mystore.chatThread.slice(-100), e.data.props.chatThreadChannel]
                if (!["moobot", "nightbot", "ayrob0t"].includes(e.data.props.chatThreadChannel.userName)) {
                    //const tts = await getTts(`${}`.replace(/_/g, ' '));
                    if (mystore.activeAudio) mystore.audio = [...mystore.audio, e.data.props.chatThreadChannel]
                }
            }
            if (mystore.autoScroll) {
                window.scrollTo(0, document.body.scrollHeight);
            }
        }, false);
        window.opener.onbeforeunload = () => window.close()
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

    const handleChange = (e) => {
        mystore.activeAudio = e.target.checked
        if (e.target.checked) {
            startTcl()
        } else {
            mystore.audio = []
            clearInterval(interval)
        }
    }

    return (
        <>
            <div style={{ position: 'fixed', top: 0, left: 0, background: '#18181b', width: '100%', textAlign: 'center' }}><input style={{ position: 'absolute', left: 0 }} type="checkbox" onChange={handleChange} checked={mystore.activeAudio} /> <span>{mystore.title}</span></div>
            <div className="chat-thread" style={{ fontFamily: "Roobert,Helvetica Neue,Helvetica,Arial,sans-serif", marginTop: 25 }}>
                {mystore.chatThread.length > 0 && mystore.chatThread.map((chatThread) =>
                    <div key={chatThread.id} style={{ overflowWrap: "break-word", margin: "10px 0", lineHeight: "1.5em" }}>
                        <small style={{ color: "grey", verticalAlign: "middle", marginRight: 5 }}>
                            {chatThread.ts}
                        </small>
                        {chatThread.badgesUser && <span>{chatThread.badgesUser.map((badgeUser, k) =>
                            <Tippy
                                key={k}
                                content={formatTipForBadge(badgeUser, chatThread)}
                                theme="light"
                                placement="top-start"
                                offset={[-10, 10]}
                            >
                                <img style={{ verticalAlign: "middle", marginRight: 3 }}
                                    src={badgeUser && badgeUser.image_url_1x}
                                    alt="" />
                            </Tippy>
                        )}</span>}
                        <span style={{ color: convertUserColor(chatThread.userInfo), fontWeight: "bold", verticalAlign: "middle" }}>{chatThread.displayName} : </span>
                        <span style={chatThread.status === "action" ? { color: convertUserColor(chatThread.userInfo), verticalAlign: "middle" } : { verticalAlign: "middle" }} >
                            {chatThread.parsed.map((value, k) => {
                                let result;
                                switch (value.type) {
                                    case "text":
                                        result = parseUrls(value.text).map((v, k) => {
                                            let text;
                                            switch (v.type) {
                                                case "link":
                                                    text = <a key={k} target='_blank' rel="noopener noreferrer" style={chatThread.status === "action" ? { color: convertUserColor(chatThread.userInfo), verticalAlign: "middle" } : { color: "#efeff1", verticalAlign: "middle" }} href={v.url} >{v.text}</a>
                                                    break;

                                                default:
                                                    text = v.text;
                                                    break;
                                            }
                                            return text;
                                        });
                                        break;

                                    case "emote":
                                        result = <Tippy
                                            key={k}
                                            content={<div style={{ textAlign: 'center' }}><img src={preloadImage(`https://static-cdn.jtvnw.net/emoticons/v1/${value.id}/3.0`)} alt={value.name} /><p>{value.name}</p></div>}
                                            theme="light"
                                            placement="top"
                                            trigger="click"
                                            offset={[0, 20]}
                                            followCursor={false}
                                            plugins={[followCursor]}
                                        >
                                            <div style={{ height: "1em", verticalAlign: "middle", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                                <img className="emoticon" src={`https://static-cdn.jtvnw.net/emoticons/v1/${value.id}/1.0`} alt={value.name} />
                                            </div>
                                        </Tippy>
                                        break;

                                    default: break;
                                }
                                return result;
                            })}
                        </span>
                    </div>
                )}
            </div>
        </>
    )
}

export default observer(Chat);