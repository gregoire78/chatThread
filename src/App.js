import React, { useEffect, useState, useRef } from 'react';
import tmi from 'tmi.js';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/fr';
import uuid from 'uuid/v4';
import axios from 'axios';
import { WidthProvider, Responsive } from "react-grid-layout";

import Panel from './Panel';

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
    'peteur_pan',
    'solary',
    'mathox',
    'moman',
    'xari',
    'aypierre',
    'aureliensama',
    'nems',
    'libe',
    'wingobear',
    'kennystream',
    'sardoche',
    'gotaga',
    'loeya',
    'mistermv',
    'ponce',
    'shaunz',
    'domingo',
    'squeezielive',
    'fantabobshow',
    'zerator',
    'grabyourpopcorn',
    'skyyart'
  ];

  const generateLayout = () => {
    return _.map(channels, (item, i) => {
      const w = 3;
      const h = 1;
      return {
        x: Math.floor((i * 12 / 4) % 12),
        y: Infinity,
        w: w,
        h: h,
        i: "#" + item,
      };
    });
  }

  const [connecting, setConnecting] = useState(true);
  const [rooms, _setRooms] = useState([]);
  const [chatThreads, _setChatThreads] = useState(new Map());
  const [chatBans, _setBans] = useState(new Map());
  const [infoStreams, setInfoStreams] = useState([]);
  const [infoChannels, setInfoChannels] = useState([]);
  const [badgesChannels, setBadgesChannels] = useState(new Map());
  const myStateRef = useRef(chatThreads);
  const chatBansRef = useRef(chatBans);
  const badgesChannelsRef = useRef(badgesChannels);
  const roomsRef = useRef(rooms);
  const scrollBarRefs = useRef(new Map());
  const [layouts, setLayouts] = useState({ ...getFromLS("layouts"), ...{ lg: _.uniqBy([...getFromLS("layouts") ? getFromLS("layouts").lg.filter((i) => channels.includes(i.i.replace("#", ""))) : [], ...generateLayout()], 'i') } });

  const setChatThreads = (channel, chat) => {
    _setChatThreads(prevState => {
      const y = prevState.get(channel)
      return myStateRef.current = new Map(prevState).set(channel, y ? [...y.slice(-2999), chat] : [chat]);
    });
  };

  const setRooms = (room) => {
    _setRooms(prevState => {
      return roomsRef.current = [...prevState, room];
    });
  };

  const setChatBans = (channel, ban) => {
    const scrollBar = scrollBarRefs.current.get(channel);
    const isBottom = scrollBar.scrollHeight - scrollBar.scrollTop === scrollBar.clientHeight

    _setBans(prevState => {
      const y = prevState.get(channel)
      return chatBansRef.current = new Map(prevState).set(channel, y ? [...y, ban] : [ban]);
    });
    if (isBottom) {
      scrollBar.scrollToBottom();
    }
  };

  const getInfoStreams = async () => {
    const infos = (await axios.get(`https://api.twitch.tv/helix/streams?user_login=${channels.join('&user_login=')}`, {
      headers: {
        'Client-ID': process.env.REACT_APP_TWITCH_CLIENTID
      }
    })).data.data;
    setInfoStreams(infos);
  }

  const getInfoChannels = async () => {
    const infos = (await axios.get(`https://api.twitch.tv/helix/users?login=${channels.join('&login=')}`, {
      headers: {
        'Client-ID': process.env.REACT_APP_TWITCH_CLIENTID
      }
    })).data.data;
    setInfoChannels(infos);
    const badgesGlobal = (await axios.get(`https://badges.twitch.tv/v1/badges/global/display?language=fr`)).data;
    await Promise.all(channels.map(async (channel) => {
      const f = infos.find((info) => "#" + info.login === channel);
      const badges = await getBadgeLink(f, badgesGlobal);
      setBadgesChannels((p) => {
        return badgesChannelsRef.current = new Map(p).set(channel, badges)
      });
      return badges;
    }));
  }

  const getBadgeLink = async (infoChannel, badgesGlobal) => {
    const badgesChannel = (await axios.get(`https://badges.twitch.tv/v1/badges/channels/${infoChannel.id}/display?language=fr`)).data;
    return _.merge({}, badgesGlobal, badgesChannel).badge_sets;
  }

  useInterval(() => {
    getInfoStreams();
  }, 20000)

  useEffect(() => {
    getInfoStreams();
    getInfoChannels();
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
      setRooms(state);
      //console.log("%croomstate", 'color:green;', channel, state)
    });

    client.on("chat", async (channel, user, message, self) => {
      //const channelDetails = _.find(channelsDetails, ['channel', channel.slice(1)]);
      let chat = { id: uuid(), status: "message", message, channel, user, ts: (user["tmi-sent-ts"] ? moment(user["tmi-sent-ts"], "x").format('LT') : moment().format('LT')), ts_global: moment().valueOf() };
      if (user.badges) {
        chat.badgesUser = _.map(user.badges, (v, k) => { return { ...badgesChannelsRef.current.get(channel)[k].versions[v], id: k } })
      }
      //setChatThreads(prev => [...prev, chat]);
      setChatThreads(channel, chat);
    });

    client.on("timeout", (channel, username, reason, duration, userstate) => {
      //const channelDetails = _.find(channelsDetails, ['channel', channel.slice(1)]);
      const messages = myStateRef.current.get(channel).filter((message) => message.user ? username === message.user.username : false);
      let to = { id: uuid(), status: "timeout", username, channel, reason, duration, ts: moment(userstate["tmi-sent-ts"], "x").format('LT'), ts_global: moment().valueOf(), messages, userstate, color: 'darkorange' };
      //console.log("%ctimeout", 'color: orange', channel, username, to);
      setChatBans(channel, to);
    });

    client.on("ban", (channel, username, reason, userstate) => {
      const messages = myStateRef.current.get(channel).filter((message) => message.user ? username === message.user.username : false)
      let ban = { id: uuid(), status: "ban", username, channel, reason, ts: moment(userstate["tmi-sent-ts"], "x").format('LT'), ts_global: moment().valueOf(), messages, userstate, color: 'red' };
      //console.log("%cban", 'color: red', channel, username, ban);
      setChatBans(channel, ban);
    });

    client.on("messagedeleted", (channel, username, deletedMessage, userstate) => {
      let chat = { id: uuid(), status: "message", message: deletedMessage, channel, ts: (userstate["tmi-sent-ts"] ? moment(userstate["tmi-sent-ts"], "x").format('LT') : moment().format('LT')), ts_global: moment().valueOf() };
      let messageDeleted = { id: uuid(), status: "messagedeleted", username, channel, ts: moment(userstate["tmi-sent-ts"], "x").format('LT'), ts_global: moment().valueOf(), messages: [chat], userstate, color: 'blue' };
      //console.log("%cmessagedeleted", 'color: orange', channel, username, messageDeleted);
      setChatBans(channel, messageDeleted);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //useEffect(() => console.log(badgesChannels), [badgesChannels])
  //useEffect(() => console.log(chatThreads), [chatThreads])

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
            onResize={(layout, oldItem, newItem, placeholder, e, element) => scrollBarRefs.current.get(element.parentElement.getAttribute('data-channel')).scrollToBottom()}
            //onDragStart={(layout, oldItem, newItem, placeholder, e, element) => { e.target.style.cursor = "grabbing"; }}
            onDrag={(layout, oldItem, newItem, placeholder, e, element) => { element.getElementsByClassName('title')[0].style.cursor = "grabbing" }}
            onDragStop={(layout, oldItem, newItem, placeholder, e, element) => { element.getElementsByClassName('title')[0].style.cursor = "grab"; }}
          >
            {layouts.lg.map((l) => {
              const channel = l.i;
              const infosStream = infoStreams.find((infosStream) => "#" + infosStream.user_name.toLowerCase() === channel);
              const infosChannel = infoChannels.find((infosChannel) => "#" + infosChannel.login === channel);
              return (
                <div key={channel} className="channel" data-channel={channel}>
                  <Panel channel={channel} chatThreads={chatThreads} scrollBarRefs={scrollBarRefs} chatBans={chatBans} infosStream={infosStream} infosChannel={infosChannel} rooms={rooms} />
                </div>
              )
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
