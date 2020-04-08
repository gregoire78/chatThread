import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react';
import ChatClient from 'twitch-chat-client';
import TwitchClient from 'twitch';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/fr';
import uuid from 'uuid/v4';
//import axios from 'axios';
import { WidthProvider, Responsive } from "react-grid-layout";

import Panel from './Panel';
import { useStore } from './store';

import 'react-tippy/dist/tippy.css';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import './App.css';

moment.locale('fr');
const ResponsiveGridLayout = WidthProvider(Responsive);
//const originalLayout = getFromLS("layouts") || {};
const client = TwitchClient.withClientCredentials(process.env.REACT_APP_TWITCH_CLIENTID, process.env.REACT_APP_TWITCH_CLIENTSECRET);

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
    'mathox',
    'aypierre',
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
        i: item,
      };
    });
  }
  const store = useStore();
  const [infoStreams, setInfoStreams] = useState([]);
  const [infoChannels, setInfoChannels] = useState([]);
  const [badgesChannels, setBadgesChannels] = useState(new Map());
  const badgesChannelsRef = useRef(badgesChannels);
  const scrollBarRefs = useRef(new Map());
  const [layouts, setLayouts] = useState({ ...getFromLS("layouts"), ...{ lg: _.uniqBy([...getFromLS("layouts") ? getFromLS("layouts").lg.filter((i) => channels.includes(i.i)) : [], ...generateLayout()], 'i') } });

  const setChatBans = (channel, ban) => {
    const scrollBar = scrollBarRefs.current.get(channel);
    const isBottom = scrollBar.scrollHeight - scrollBar.scrollTop === scrollBar.clientHeight

    store.setChatBan(channel, ban);
    if (isBottom) {
      scrollBar.scrollToBottom();
    }
  };

  const chatListener = async () => {

    const channelsData = await client.helix.users.getUsersByNames(channels);
    setInfoChannels(channelsData);

    const badgesGlobal = await (await client.badges.getGlobalBadges('fr'))._data;
    Promise.all(channelsData.map(async (channel) => {
      const badges = await (await client.badges.getChannelBadges(channel, false, 'fr'))._data;
      setBadgesChannels((p) => {
        return badgesChannelsRef.current = new Map(p).set("#" + channel.name, _.merge({}, badgesGlobal, badges))
      });
    }));

    const chatClient = await ChatClient.anonymous();
    chatClient.onRegister(() => {
      Promise.all(channels.map((channel) => chatClient.join(channel).then(() => {
        const channelTag = "#" + channel;
        store.rooms = [...store.rooms, channel];
        if (!store.chatThreads.get(channelTag)) {
          store.chatThreads.set(channelTag, []);
        }
      })))
    });

    chatClient.onAnyMessage(async (msg) => {
      //if (msg.tags.get('msg-id')) console.log(msg, msg.tags.get('msg-id'))
      switch (msg.command) {
        case "ROOMSTATE":
          //console.log(msg.channel.value, msg.tags)
          break;

        case "CLEARCHAT":
          //const user = await client.helix.users.getUserById(msg.tags.get('target-user-id'));
          const duration = msg.tags.get('ban-duration');
          const { params: { channel, user }, tags } = msg;
          const messages = store.chatThreads.get(channel).filter((chatThread) => user === chatThread.userName);
          const ts = moment(tags.get('tmi-sent-ts'), "x").format('LT');
          let ban;
          if (duration) {
            ban = { id: uuid(), status: "timeout", userName: user, channel, duration, ts, ts_global: moment().valueOf(), messages, color: 'darkorange' };
            //console.log("%ctimeout", 'color: orange', channel, user, ban);
          } else {
            ban = { id: uuid(), status: "ban", userName: user, channel, ts, ts_global: moment().valueOf(), messages, color: 'red' };
            //console.log("%cban", 'color: red', channel, user, ban);
          }
          setChatBans(channel, ban);
          break;

        default:
          break;
      }
    })

    chatClient.onPrivmsg((channel, user, message, msg) => {
      let chat = {
        id: msg.tags.get('id'),
        status: "message",
        message,
        channel,
        userName: user,
        displayName: msg.userInfo.displayName,
        ts: moment(msg.tags.get('tmi-sent-ts'), "x").format('LT'),
        ts_global: moment().valueOf(),
        parsed: msg.parseEmotes(),
        userInfo: { userName: user }
      };
      if (msg.userInfo.badges.size > 0) {
        chat.badgesUser = [];
        msg.userInfo.badges.forEach((v, k) => { chat.badgesUser = [...chat.badgesUser, { ...badgesChannelsRef.current.get(channel)[k].versions[v], id: k }] });
      }
      if (msg.userInfo.color) {
        chat.userInfo = { color: msg.userInfo.color, userName: user }
      }
      if (msg.tags.get('badge-info')) {
        const badgesInfos = msg.tags.get('badge-info');
        const parsedInfos = badgesInfos.split('/');
        chat.badgeInfo = new Map().set(parsedInfos[0], parsedInfos[1]);
      }
      store.setChatThread(channel, chat);
    })

    chatClient.onMessageRemove((channel, messageId, msg) => {
      const { tags, userName } = msg;
      const ts = moment(tags.get('tmi-sent-ts'), "x").format('LT');
      let chat = store.chatThreads.get(channel).find((message) => message.id && messageId === message.id);
      let messageDeleted = { id: uuid(), status: "messagedeleted", userName, channel, ts, ts_global: moment().valueOf(), messages: [chat], msg, color: 'blue' };
      //console.log("%cmessagedeleted", 'color: blue', channel, userName, messageDeleted);
      setChatBans(channel, messageDeleted);
    })

    chatClient.onAction((channel, user, message, msg) => {
      const ty = msg.params
      Object.defineProperty(msg, 'params', {
        get: () => {
          return {...ty, message};
        },
      });
      let chat = {
        id: msg.tags.get('id'),
        status: "action",
        message,
        channel,
        userName: user,
        displayName: msg.userInfo.displayName,
        ts: moment(msg.tags.get('tmi-sent-ts'), "x").format('LT'),
        ts_global: moment().valueOf(),
        parsed: msg.parseEmotes(),
        userInfo: { userName: user }
      };
      if (msg.userInfo.badges.size > 0) {
        chat.badgesUser = [];
        msg.userInfo.badges.forEach((v, k) => { chat.badgesUser = [...chat.badgesUser, { ...badgesChannelsRef.current.get(channel)[k].versions[v], id: k }] });
      }
      if (msg.userInfo.color) {
        chat.userInfo = { color: msg.userInfo.color, userName: user }
      }
      if (msg.tags.get('badge-info')) {
        const badgesInfos = msg.tags.get('badge-info');
        const parsedInfos = badgesInfos.split('/');
        chat.badgeInfo = new Map().set(parsedInfos[0], parsedInfos[1]);
      }
      store.setChatThread(channel, chat);
    })

    await chatClient.connect();
  }

  const getInfoStreams = async () => {
    const infos = await client.helix.streams.getStreams({userName:channels});
    setInfoStreams(infos.data);
  }

  useInterval(() => {
    getInfoStreams();
  }, 20000)

  useEffect(() => {
    getInfoStreams().then(()=>chatListener());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLayoutChange = (layout, layouts) => {
    saveToLS("layouts", layouts);
    setLayouts(layouts);
  }

  return (
    <div className="App">
      <>
        {<ResponsiveGridLayout
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
          onResize={(layout, oldItem, newItem, placeholder, e, element) => scrollBarRefs.current.get("#" + element.parentElement.getAttribute('data-channel')).scrollToBottom()}
          //onDragStart={(layout, oldItem, newItem, placeholder, e, element) => { e.target.style.cursor = "grabbing"; }}
          onDrag={(layout, oldItem, newItem, placeholder, e, element) => { element.getElementsByClassName('title')[0].style.cursor = "grabbing" }}
          onDragStop={(layout, oldItem, newItem, placeholder, e, element) => { element.getElementsByClassName('title')[0].style.cursor = "grab"; }}
        >
          {layouts.lg.map((l) => {
            const channel = l.i;
            const infosStream = infoStreams.find((infosStream) => infosStream.userDisplayName.toLowerCase() === channel);
            const infosChannel = infoChannels.find((infosChannel) => infosChannel.name === channel);

            return (
              <div key={channel} className="channel" data-channel={channel}>
                <Panel channel={channel} chatThreads={store.chatThreads} scrollBarRefs={scrollBarRefs} chatBans={store.chatBans} infosStream={infosStream} infosChannel={infosChannel} rooms={store.rooms} />
              </div>
            )
          })}
        </ResponsiveGridLayout>}
      </>
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

export default observer(App);
