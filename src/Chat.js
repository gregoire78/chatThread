import React, { Fragment, useEffect, useRef } from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import _ from 'lodash';
import Tippy from '@tippyjs/react';
import { followCursor } from 'tippy.js/headless'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import chroma from 'chroma-js';
import { parseUrls, urlRegex } from 'parse-msg';
import axios from "axios";
import Modal from 'react-modal';
import { toJS } from 'mobx';

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

function formatTipForBadge(badgeUser, badgeInfo) {
    let text = "";
    console.log(badgeInfo)
    switch (badgeUser.id) {
        case "subscriber":
            const badgeType = badgeUser.value > 0 ? badgeUser.value >= 2000 ? badgeUser.value >= 3000 ? badgeUser.value - 3000 : badgeUser.value - 2000 : badgeUser.value : 0
            const levelBadge = badgeType > 0 ? `des ${badgeType} mois` : 'basique'
            text = <b>Abonné(e) depuis {badgeInfo.get('subscriber')} mois <small>(badge {levelBadge} {badgeUser.value >= 2000 ? badgeUser.value >= 3000 ? `de niveau 3` : `de niveau 2` : ""})</small></b>
            break;

        case "founder":
            text = <b>Fondateur, abonné(e) depuis {badgeInfo.get('founder')} mois</b>
            break;

        default:
            text = <b>{badgeUser.id + " " + badgeUser.value}</b>
            break;
    }
    return text;
}

function planSub(subInfo) {
    let text = "";
    switch (subInfo.plan) {
        case "1000":
            text = "Abonnement niveau 1"
            break;

        case "2000":
            text = "Abonnement niveau 2"
            break;

        case "3000":
            text = "Abonnement niveau 3"
            break;

        default:
            text = "Abonnement " + subInfo.plan
            break;
    }
    return <span style={{ fontWeight: "bold", verticalAlign: "middle" }}>{text} ({subInfo.months}<span style={{ position: "relative", top: "-3px" }}>{subInfo.months > 1 ? <>ème</> : <>er</>}</span> mois{subInfo.streak ? " dont " + subInfo.streak + " mois consécutifs" : ""}) </span>
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
    const male = {
        name: 'fr-FR-Wavenet-B',
        ssmlGender: "MALE"
    }
    const female = {
        name: 'fr-FR-Wavenet-A',
        ssmlGender: "FEMALE"
    }
    const mystore = useLocalObservable(() => ({
        chatThread: [],
        autoScroll: true,
        audio: [],
        activeAudio: false,
        title: '',
        modalIsOpen: false,
        speaker: female,
        idMessageSpeak: "",
    }));
    const player = useRef(new Audio())

    const getTts = async (text, rate) => {
        return await (await axios.post(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.REACT_APP_TTS}`, {
            input: {
                ssml: '<speak>' + text + '</speak>'
            },
            voice: {
                languageCode: "fr-FR",
                name: mystore.speaker.name,
                ssmlGender: mystore.speaker.ssmlGender
            },
            audioConfig: {
                audioEncoding: "OGG_OPUS",
                speakingRate: rate ? rate + "" : "1"
            }
        })).data
    }

    let interval
    const playsound = async (init = false) => {
        player.current.load()
        if (init) startTcl();
        if (mystore.audio.length > 0 && player.current.paused) {
            clearInterval(interval)
            const message = mystore.audio.shift() //_.find(mystore.chatThread, { 'id': mystore.audio.shift() });
            mystore.idMessageSpeak = message.id
            const rate = mystore.audio.length >= 5 ? mystore.audio.length >= 10 ? 3 : 2 : 1
            const tts = await getTts(`${message.text.join(' ').replace(urlRegex({ strict: true }), ' un lien ').replace(/merde/g, '<say-as interpret-as="expletive">merde</say-as>').replace('@', '')}`.replace(/_/g, ' '), rate);
            player.current.volume = 0.4;
            player.current.src = 'data:audio/mpeg;base64,' + tts.audioContent
            player.current.play().then(_ => { })
                .catch(error => {
                    console.log(error, tts, message);
                    if (mystore.audio.length > 0) {
                        playsound();
                    } else {
                        mystore.idMessageSpeak = ""
                        startTcl();
                    }
                });
            player.current.onended = () => {
                if (mystore.audio.length > 0) {
                    playsound();
                } else {
                    mystore.idMessageSpeak = ""
                    startTcl();
                }
            }
        }
    }
    const startTcl = () => interval = setInterval(() => playsound(), 100);

    useEffect(() => {
        Modal.setAppElement('body');
        if (mystore.activeAudio) startTcl()
        document.body.style.margin = "10px 0";
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
                mystore.chatThread = [...mystore.chatThread.slice(-150), e.data.props.chatThreadChannel]
                const text = e.data.props.chatThreadChannel.parsed.map(v => v.type === 'text' ? v.text !== " " ? v.text : null : null).filter(Boolean)
                if (!["moobot", "nightbot", "ayrob0t", "robochiotte"].includes(e.data.props.chatThreadChannel.userName) && text.length > 0) {
                    //const tts = await getTts(`${}`.replace(/_/g, ' '));
                    if (mystore.activeAudio) mystore.audio = [...mystore.audio, { id: e.data.props.chatThreadChannel.id, text }]
                }

                if (e.data.props.chatThreadChannel.isCheer) {
                    const anvil = new Audio()
                    const messageAudio = new Audio()
                    const tts = await getTts(`Alerte : ${e.data.props.chatThreadChannel.userName} donne ${e.data.props.chatThreadChannel.totalBits} bits à ${e.data.props.title} !`, 0.8);
                    messageAudio.src = 'data:audio/mpeg;base64,' + tts.audioContent
                    messageAudio.volume = 0.8

                    if (e.data.props.chatThreadChannel.totalBits >= 1000)
                        anvil.src = "./sounds/levelup.ogg"
                    else
                        anvil.src = "./sounds/anvil.ogg"
                    anvil.volume = 0.1
                    anvil.play().then(() => messageAudio.play())
                }

                if (e.data.props.chatThreadChannel.status === "resub" || e.data.props.chatThreadChannel.status === "sub") {
                    const anvil = new Audio()
                    anvil.src = "./sounds/prepare_wololo.ogg"
                    anvil.volume = 0.5
                    anvil.play()
                }
            }
            if (mystore.autoScroll) {
                setTimeout(() => {
                    window.scrollTo(0, document.body.scrollHeight);
                }, 0)
            }
        }, false);
        window.opener.onbeforeunload = () => window.close()
        const scroll = (e) => {
            if ((window.innerHeight + window.scrollY + 100) >= document.body.offsetHeight) {
                mystore.autoScroll = true;
            } else {
                mystore.autoScroll = false;
            }
        }
        window.addEventListener('wheel', scroll, true);
        window.addEventListener('touchmove', scroll, true);
        window.addEventListener('touchend', scroll, true);
        window.addEventListener('scroll', scroll, true);
        window.addEventListener("resize", () => {
            setTimeout(() => {
                window.scrollTo(0, document.body.scrollHeight);
            }, 0);
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

    const openModal = () => {
        mystore.modalIsOpen = true;
    }

    const closeModal = () => {
        mystore.modalIsOpen = false;
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            color: 'black',
        }
    };

    const changeSpeaker = (e) => {
        if (e.target.checked) {
            mystore.speaker = male
        } else {
            mystore.speaker = female
        }
    }

    return (
        <>
            <Modal
                isOpen={mystore.modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Configuration"
            >
                <label><input type="checkbox" onChange={changeSpeaker} checked={mystore.speaker.ssmlGender === "MALE"} />Narrateur masculin</label>
            </Modal>
            <div style={{ position: 'fixed', top: 0, left: 0, background: '#18181b', width: '100%', textAlign: 'center' }}><input style={{ position: 'absolute', left: 0 }} type="checkbox" onChange={handleChange} checked={mystore.activeAudio} /><button onClick={openModal} style={{ background: "#353535", color: "lightgray" }}>config</button> <span>{mystore.title}</span></div>
            <div className="chat-thread" style={{ fontFamily: "Roobert,Helvetica Neue,Helvetica,Arial,sans-serif", marginTop: 25 }}>
                {mystore.chatThread.length > 0 && mystore.chatThread.map((ct) => {
                    const containsJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(ct.displayName)
                    return <div key={ct.id} style={{ overflowWrap: "break-word", ...ct.status === "sub" ? { background: "#363694" } : {}, ...ct.status === "resub" ? { background: "#77260c" } : {}, ...ct.id === mystore.idMessageSpeak ? { outline: "1px dashed gray", outlineOffset: "3px" } : {} }}>
                        <span style={{ color: "grey", verticalAlign: "middle", marginRight: 5, fontSize: "10px" }}>
                            {ct.ts}
                        </span>
                        {ct.badgesUser && <>{ct.badgesUser.map((badgeUser, k) =>
                            <Tippy
                                key={k}
                                content={formatTipForBadge(badgeUser, new Map(toJS(ct.badgeInfo)))}
                                theme="light"
                                placement="top-start"
                                offset={[-10, 10]}
                            >
                                <img style={{ verticalAlign: "middle", marginRight: 3 }}
                                    src={badgeUser && badgeUser.image_url_1x}
                                    alt="" />
                            </Tippy>
                        )}</>}
                        <span style={{ color: convertUserColor(ct.userInfo), fontWeight: "bold", verticalAlign: "middle", lineHeight: "23px" }}>{ct.displayName}</span>
                        {containsJapanese && <small style={{ color: convertUserColor(ct.userInfo), verticalAlign: "middle" }}> ({ct.userName})</small>}
                        <span style={{ verticalAlign: "middle" }}>: </span>
                        {(ct.status === "sub" || ct.status === "resub") && planSub(ct.subInfo)}
                        {ct.parsed.map((value, k) => {
                            let result;
                            switch (value.type) {
                                case "text":
                                    result = parseUrls(value.text).map((v, k) => {
                                        let text;
                                        switch (v.type) {
                                            case "link":
                                                text = <a key={k} target='_blank' rel="noopener noreferrer" style={{ ...ct.status === "action" ? { color: convertUserColor(ct.userInfo) } : { color: "#efeff1" }, verticalAlign: "middle" }} href={v.url} >{v.text}</a>
                                                break;

                                            default:
                                                text = <span key={k} style={{ ...ct.status === "action" ? { color: convertUserColor(ct.userInfo) } : {}, verticalAlign: "middle" }}>{v.text}</span>;
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
                                        <span style={{ height: "17px", verticalAlign: "middle", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                            <img className="emoticon" src={`https://static-cdn.jtvnw.net/emoticons/v1/${value.id}/1.0`} alt={value.name} />
                                        </span>
                                    </Tippy>
                                    break;

                                case "cheer":
                                    result = <Fragment key={k}>
                                        <span style={{ height: "17px", verticalAlign: "middle", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                            <img className="emoticon" src={value.displayInfo.url} alt={value.name} />
                                        </span>
                                        <span style={{ color: value.displayInfo.color, verticalAlign: "middle" }}>{value.amount}</span>
                                    </Fragment>
                                    break;

                                default: break;
                            }
                            return result;
                        })}
                    </div>
                })}
            </div>
        </>
    )
}

export default observer(Chat);