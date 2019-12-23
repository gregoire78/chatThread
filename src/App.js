import React, { useEffect, useState, useRef } from 'react';
import tmi from 'tmi.js';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/fr';
import uuid from 'uuid/v4';
import axios from 'axios';
import { Scrollbar } from 'react-scrollbars-custom';
import { WidthProvider, Responsive } from "react-grid-layout";

import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import './App.css';

moment.locale('fr');
const ResponsiveGridLayout = WidthProvider(Responsive);
//const originalLayout = getFromLS("layouts") || {};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function App() {
  const channels = [
    'mathox',
    'aypierre',
    'wingobear',
    'kennystream',
    'sardoche',
    'gotaga',
    'loeya',
    'mistermv',
    'ponce',
    'shaunz',
    'peteur_pan',
    'domingo',
    'squeezielive',
    'fantabobshow',
    'zerator'
  ];

  const generateLayout = () => {
    return _.map(channels, (item, i) => {
      const w = 3;
      const h = 1;
      return {
        x: Math.floor((i * 12 / 4) % 12),
        y: 0,
        w: w,
        h: h,
        i: "#" + item,
      };
    });
  }

  const [connecting, setConnecting] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [chatThreads, _setChatThreads] = useState(new Map());
  const [chatBans, _setBans] = useState(new Map());
  const [infoStreams, setInfoStreams] = useState([]);
  const myStateRef = useRef(chatThreads);
  const chatBansRef = useRef(chatBans);
  const scrollBarRefs = useRef(new Map());
  const [layouts, setLayouts] = useState(JSON.parse(JSON.stringify(getFromLS("layouts") || { lg: generateLayout() })));

  const setChatThreads = (channel, chat) => {
    _setChatThreads(prevState => {
      const y = prevState.get(channel)
      return myStateRef.current = new Map(prevState).set(channel, y ? [...y.slice(-199), chat] : [chat]);
    });
  };
  const setChatBans = (channel, ban) => {
    _setBans(prevState => {
      const y = prevState.get(channel)
      return chatBansRef.current = new Map(prevState).set(channel, y ? [...y.slice(-199), ban] : [ban]);
    });
  };

  const getInfoStreams = async () => {
    const infos = (await axios.get(`https://api.twitch.tv/helix/streams?user_login=${channels.join('&user_login=')}`, {
      headers: {
        'Client-ID': process.env.REACT_APP_TWITCH_CLIENTID
      }
    })).data.data;
    setInfoStreams(infos);
  }

  useInterval(() => {
    getInfoStreams();
  }, 20000)

  useEffect(() => {
    getInfoStreams();
    const client = new tmi.client({
      connection: {
        secure: true,
        reconnect: true
      },
      channels
    });

    client.connect();
    client.on("connecting", () => { setConnecting(true) });
    client.on("connected", (address, port) => {
      setConnecting(false);
      console.log(connecting ? "Connecting to : " + address + ":" + port : "Connected to : " + address + ":" + port);
    });

    client.on("roomstate", (channel, state) => {
      setRooms(_.values(_.merge(_.keyBy(rooms, 'room-id'), _.keyBy([state], 'room-id'))))
      //console.log("%croomstate", 'color:green;', channel, state)
      setChatThreads(channel, []);
      //show in thread
      /*const channelDetails = _.find(channelsDetails, ['channel', channel.slice(1)]);
      let roomstate = { status: "roomstate", channel: channelDetails, state, ts_global: moment().valueOf() };
      setChatThreads([...chatThreads.slice(-199), roomstate])*/
      //this.chatComponent.current.scrollToBottom();
    });

    client.on("chat", async (channel, user, message, self) => {
      //const channelDetails = _.find(channelsDetails, ['channel', channel.slice(1)]);
      let chat = { id: uuid(), status: "message", message, channel, user, ts: (user["tmi-sent-ts"] ? moment(user["tmi-sent-ts"], "x").format('LT') : moment().format('LT')), ts_global: moment().valueOf() };
      //setChatThreads(prev => [...prev, chat]);
      setChatThreads(channel, chat);
    });

    client.on("timeout", (channel, username, reason, duration, userstate) => {
      //const channelDetails = _.find(channelsDetails, ['channel', channel.slice(1)]);
      const messages = myStateRef.current.get(channel).filter((message) => message.user ? username === message.user.username : false);
      let to = { id: uuid(), status: "timeout", username, channel, reason, duration, ts: moment(userstate["tmi-sent-ts"], "x").format('LT'), ts_global: moment().valueOf(), messages, userstate, color: 'orange' };
      //console.log("%ctimeout", 'color: orange', channel, username, to);
      setChatBans(channel, to);
      scrollBarRefs.current.get(channel).scrollToBottom();
      //setChatThreads([...chatThreads.slice(-199), to]);
      //this.openNotification(`${channel} TO`, `${username} est reduit au silence pour ${duration}s`, channelDetails.infoChannel.profile_image_url)
    });

    client.on("ban", (channel, username, reason, userstate) => {
      //const channelDetails = _.find(channelsDetails, ['channel', channel.slice(1)]);
      const messages = myStateRef.current.get(channel).filter((message) => message.user ? username === message.user.username : false)
      let ban = { id: uuid(), status: "ban", username, channel, reason, ts: moment(userstate["tmi-sent-ts"], "x").format('LT'), ts_global: moment().valueOf(), messages, userstate, color: 'red' };
      //console.log("%cban", 'color: red', channel, username, ban);
      setChatBans(channel, ban);
      //setChatThreads([...chatThreads.slice(-199), ban]);
      //this.openNotification(`${channel} BANNED`, `${username} est banni`, channelDetails.infoChannel.profile_image_url)
      scrollBarRefs.current.get(channel).scrollToBottom();
    });

    client.on("messagedeleted", (channel, username, deletedMessage, userstate) => {
      let chat = { id: uuid(), status: "message", message: deletedMessage, channel, ts: (userstate["tmi-sent-ts"] ? moment(userstate["tmi-sent-ts"], "x").format('LT') : moment().format('LT')), ts_global: moment().valueOf() };
      let messageDeleted = { id: uuid(), status: "messagedeleted", username, channel, ts: moment(userstate["tmi-sent-ts"], "x").format('LT'), ts_global: moment().valueOf(), messages: [chat], userstate, color: 'yellow' };
      //console.log("%cmessagedeleted", 'color: orange', channel, username, messageDeleted);
      setChatBans(channel, messageDeleted);
      scrollBarRefs.current.get(channel).scrollToBottom();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //useEffect(() => console.log(infoStreams), [infoStreams])

  const onLayoutChange = (layout, layouts) => {
    saveToLS("layouts", layouts);
    setLayouts(layouts);
  }

  return (
    <div className="App">
      {connecting ? <p>connecting to chat irc</p> :
        <>
          {/*{[...chatThreads.keys()].map((channel) => {
            return (
              <div key={channel}>
                <p>{channel}</p>
                {chatThreads.get(channel).map(chatThread => <p key={chatThread.id}>{chatThread.message}</p>)}
              </div>)
          })}
        <hr />*/}
          <ResponsiveGridLayout
            className="layout"
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            measureBeforeMount={false}
            useCSSTransforms={true}
            layouts={layouts}
            verticalCompact={true}
            compactType="vertical"
            onLayoutChange={onLayoutChange}
            isDraggable={true}
            draggableHandle=".title"
          >
            {layouts.lg.map((l) => {
              const channel = l.i;
              const infos = infoStreams.find((infoStream) => "#" + infoStream.user_name.toLowerCase() === channel);
              return (
                <div className="channel" key={channel}>
                  <div className="title" style={[...chatThreads.keys()].find((k) => k === channel) ? { opacity: 1 } : {}}>{channel}<span>{infos && infos.type === "live" && "🔴"}</span></div>
                  <Scrollbar
                    ref={(item) => scrollBarRefs.current.set(channel, item)}
                    trackYProps={{
                      renderer: props => {
                        const { elementRef, ...restProps } = props;
                        return <span {...restProps} ref={elementRef} style={{ ...restProps.style, width: 5, background: 'none', top: 0, height: '100%', borderRadius: 0 }} />;
                      }
                    }}
                    thumbYProps={{
                      renderer: props => {
                        const { elementRef, ...restProps } = props;
                        return <div {...restProps} ref={elementRef} style={{ ...restProps.style, borderRadius: 0, background: 'lightgrey' }} />;
                      }
                    }}
                    trackXProps={{
                      renderer: props => {
                        const { elementRef, ...restProps } = props;
                        return <span {...restProps} ref={elementRef} style={{ ...restProps.style, height: 5, background: 'none', left: 0, width: '100%', borderRadius: 0 }} />;
                      }
                    }}
                    thumbXProps={{
                      renderer: props => {
                        const { elementRef, ...restProps } = props;
                        return <div {...restProps} ref={elementRef} style={{ ...restProps.style, borderRadius: 0, background: 'lightgrey' }} />;
                      }
                    }}
                    className="chat"
                    style={{ height: 'calc(100% - 21px)' }}
                  >
                    {chatBans.get(channel) && chatBans.get(channel).map(chatBan => {
                      return <div key={chatBan.id}>
                        <p><span style={{ color: chatBan.color }}>{chatBan.status}</span> <small>({chatBan.ts})</small> : {chatBan.username} {chatBan.userstate['ban-duration'] && moment.duration(parseInt(chatBan.userstate['ban-duration']), "seconds").humanize()}</p>
                        <ul>
                          {chatBan.messages.map((message) =>
                            <li key={message.id}><small>({message.ts})</small> {message.message}</li>
                          )}
                        </ul>
                      </div>
                    })}
                  </Scrollbar>
                </div>)
            })}
          </ResponsiveGridLayout>
        </>}
    </div>
  );
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("ct-1")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "ct-1",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

export default App;
