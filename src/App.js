import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react';
import { ChatClient } from 'twitch-chat-client/lib';
import { ApiClient } from 'twitch/lib';
import { ClientCredentialsAuthProvider } from 'twitch-auth';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/fr';
import uuid from 'uuid/v4';
import { useParams } from "react-router-dom"
//import axios from 'axios';
import { WidthProvider, Responsive } from "react-grid-layout";

import Panel from './Panel';
import { useStore } from './store';

import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import './App.css';

moment.locale('fr');
const ResponsiveGridLayout = WidthProvider(Responsive);
//const originalLayout = getFromLS("layouts") || {};
const authProvider = new ClientCredentialsAuthProvider(process.env.REACT_APP_TWITCH_CLIENTID, process.env.REACT_APP_TWITCH_CLIENTSECRET);
const client = new ApiClient({ authProvider });

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
  let { channels: channelsRoute } = useParams()
  const channels = [
    'mathox',
    ..._.uniqBy(_.compact(channelsRoute ? channelsRoute.toLowerCase().split("+") : [])),
  ];

  const generateLayout = () => {
    return _.map(channels, (item, i) => {
      const w = 3;
      const h = 2;
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
  const [bits, setBits] = useState(new Map());
  const badgesChannelsRef = useRef(badgesChannels);
  const scrollBarRefs = useRef(new Map());
  const [layouts, setLayouts] = useState({
    ...getFromLS("layouts"),
    ...{ lg: _.uniqBy([...getFromLS("layouts") ? getFromLS("layouts").lg.filter((i) => channels.includes(i.i)) : [], ...generateLayout()], 'i') }
  });

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

    const badgesGlobal = await (await client.badges.getGlobalBadges("fr"))._data;
    Promise.all(channelsData.map(async (channel) => {
      const badges = await (await client.badges.getChannelBadges(channel, false, "fr"))._data;
      const bitsou = await client.kraken.bits.getCheermotes(channel)
      setBits(new Map(bits.set("#" + channel.name, bitsou)))
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
      //if (process.env.NODE_ENV !== 'production') if (msg.tags.get('msg-id')) console.log(msg, msg.tags.get('msg-id'))
      switch (msg.command) {
        case "ROOMSTATE":
          //console.log(msg.channel.value, msg.tags)
          break;

        case "CLEARCHAT":
          //console.log(msg)
          //const user = await client.helix.users.getUserById(msg.tags.get('target-user-id'));
          const duration = msg.tags.get('ban-duration');
          const { params: { channel, user }, tags } = msg;
          const messages = store.chatThreads.get(channel).filter((chatThread) => user === chatThread.userName);
          const ts = moment(tags.get('tmi-sent-ts'), "x").format('LTS');
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

    chatClient.onMessage(async (channel, user, message, msg) => {
      //if (process.env.NODE_ENV !== 'production') console.log(msg)
      /*if (msg.tags.get("reply-parent-msg-body")) {
        console.log(msg, {
          msgId: msg.tags.get("reply-parent-msg-id"),
          msgBody: msg.tags.get("reply-parent-msg-body"),
          displayName: msg.tags.get("reply-parent-display-name"),
          userId: msg.tags.get("reply-parent-user-id"),
          userLogin: msg.tags.get("reply-parent-user-login")
        })
      }*/

      let chat = {
        id: msg.tags.get('id'),
        status: "message",
        message,
        channel,
        userName: user,
        displayName: msg.userInfo.displayName,
        ts: moment(msg.tags.get('tmi-sent-ts'), "x").format('LTS'),
        ts_global: moment().valueOf(),
        parsed: msg.isCheer ? msg.parseEmotesAndBits(bits.get(channel)) : msg.parseEmotes(),
        userInfo: { userName: user },
        isCheer: msg.isCheer,
      };
      /*const userr = await client.helix.users.getUserByName(user);
      console.log(await userr.getFollowTo(msg.channelId))*/
      if (msg.isCheer) {
        //console.log(channel, msg.totalBits, msg.parseEmotesAndBits(bits.get(channel)))
        chat.totalBits = msg.totalBits
      }
      if (msg.userInfo.badges.size > 0 && badgesChannelsRef.current.has(channel)) {
        chat.badgesUser = [];
        msg.userInfo.badges.forEach((v, k) => { chat.badgesUser = [...chat.badgesUser, { ...badgesChannelsRef.current.get(channel)[k].versions[v], id: k, value: v }] });
      }
      if (msg.userInfo.color) {
        chat.userInfo = { color: msg.userInfo.color, userName: user }
      }
      /*if (msg.tags.get('badge-info')) {
        const badgesInfos = msg.tags.get('badge-info');
        const parsedInfos = badgesInfos.split('/');
        chat.badgeInfo = new Map().set(parsedInfos[0], parsedInfos[1]);
      }*/
      if (msg.userInfo.badgeInfo.size > 0) {
        chat.badgeInfo = msg.userInfo.badgeInfo
        //console.log(msg.userInfo)
      }
      //console.log(msg)
      store.setChatThread(channel, chat);
    })

    chatClient.onMessageRemove((channel, messageId, msg) => {
      const { tags, userName } = msg;
      const ts = moment(tags.get('tmi-sent-ts'), "x").format('LTS');
      let chat = store.chatThreads.get(channel).find((message) => message.id && messageId === message.id);
      let messageDeleted = { id: uuid(), status: "messagedeleted", userName, channel, ts, ts_global: moment().valueOf(), messages: [chat], msg, color: 'blue' };
      //console.log("%cmessagedeleted", 'color: blue', channel, userName, messageDeleted);
      setChatBans(channel, messageDeleted);
    })

    chatClient.onAction((channel, user, message, msg) => {
      const ty = msg.params
      Object.defineProperty(msg, 'params', {
        get: () => {
          return { ...ty, message };
        },
      });
      let chat = {
        id: msg.tags.get('id'),
        status: "action",
        message,
        channel,
        userName: user,
        displayName: msg.userInfo.displayName,
        ts: moment(msg.tags.get('tmi-sent-ts'), "x").format('LTS'),
        ts_global: moment().valueOf(),
        parsed: msg.parseEmotes(),
        userInfo: { userName: user }
      };
      if (msg.userInfo.badges.size > 0 && badgesChannelsRef.current.has(channel)) {
        chat.badgesUser = [];
        msg.userInfo.badges.forEach((v, k) => { chat.badgesUser = [...chat.badgesUser, { ...badgesChannelsRef.current.get(channel)[k].versions[v], id: k, value: v }] });
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

    chatClient.onRaid((channel, user, raidInfo, msg) => {
      if (process.env.NODE_ENV !== 'production') console.log(msg, raidInfo)
      /*let chat = {
        id: msg.tags.get('id'),
        status: "raid",
        channel,
        userName: user,
        displayName: msg.userInfo.displayName,
        ts: moment(msg.tags.get('tmi-sent-ts'), "x").format('LTS'),
        ts_global: moment().valueOf(),
        parsed: msg.isCheer ? msg.parseEmotesAndBits(bits.get(channel)) : msg.parseEmotes(),
        userInfo: { userName: user },
        isCheer: msg.isCheer,
      };*/
    })

    chatClient.onSub((channel, user, subInfo, msg) => {
      //if (process.env.NODE_ENV !== 'production') console.log(msg.tags.get("msg-id"), subInfo, msg)
      let chat = {
        id: msg.tags.get('id'),
        status: "sub",
        channel,
        userName: user,
        displayName: msg.userInfo.displayName,
        ts: moment(msg.tags.get('tmi-sent-ts'), "x").format('LTS'),
        ts_global: moment().valueOf(),
        parsed: msg.parseEmotes(),
        userInfo: { userName: user },
        subInfo
      };
      if (msg.userInfo.badges.size > 0 && badgesChannelsRef.current.has(channel)) {
        chat.badgesUser = [];
        msg.userInfo.badges.forEach((v, k) => { chat.badgesUser = [...chat.badgesUser, { ...badgesChannelsRef.current.get(channel)[k].versions[v], id: k, value: v }] });
      }
      if (msg.userInfo.color) {
        chat.userInfo = { color: msg.userInfo.color, userName: user }
      }
      if (msg.userInfo.badgeInfo.size > 0) {
        chat.badgeInfo = msg.userInfo.badgeInfo
      }
      store.setChatThread(channel, chat);
    })

    chatClient.onSubExtend((channel, user, subInfo, msg) => {
      //if (process.env.NODE_ENV !== 'production') console.log(msg.tags.get("msg-id"), subInfo, msg)
    })

    chatClient.onSubGift((channel, user, subInfo, msg) => {
      //if (process.env.NODE_ENV !== 'production') console.log(msg.tags.get("msg-id"), subInfo, msg)
    })

    chatClient.onResub((channel, user, subInfo, msg) => {
      //if (process.env.NODE_ENV !== 'production') console.log(msg.tags.get("msg-id"), subInfo, msg)
      let chat = {
        id: msg.tags.get('id'),
        status: "resub",
        channel,
        userName: user,
        displayName: msg.userInfo.displayName,
        ts: moment(msg.tags.get('tmi-sent-ts'), "x").format('LTS'),
        ts_global: moment().valueOf(),
        parsed: msg.parseEmotes(),
        userInfo: { userName: user },
        subInfo
      };
      if (msg.userInfo.badges.size > 0 && badgesChannelsRef.current.has(channel)) {
        chat.badgesUser = [];
        msg.userInfo.badges.forEach((v, k) => { chat.badgesUser = [...chat.badgesUser, { ...badgesChannelsRef.current.get(channel)[k].versions[v], id: k, value: v }] });
      }
      if (msg.userInfo.color) {
        chat.userInfo = { color: msg.userInfo.color, userName: user }
      }
      if (msg.userInfo.badgeInfo.size > 0) {
        chat.badgeInfo = msg.userInfo.badgeInfo
      }
      store.setChatThread(channel, chat);
    })

    chatClient.onRewardGift((channel, user, rewardGiftInfo, msg) => {
      //if (process.env.NODE_ENV !== 'production') console.log(msg.tags.get("msg-id"), rewardGiftInfo, msg)
    })

    chatClient.onStandardPayForward((channel, user, forwardInfo, msg) => {
      //if (process.env.NODE_ENV !== 'production') console.log(msg.tags.get("msg-id"), forwardInfo, msg)
    })

    chatClient.onCommunityPayForward((channel, user, forwardInfo, msg) => {
      //if (process.env.NODE_ENV !== 'production') console.log(msg.tags.get("msg-id"), forwardInfo, msg)
    })

    chatClient.onPrimePaidUpgrade((channel, user, subInfo, msg) => {
      //if (process.env.NODE_ENV !== 'production') console.log(msg.tags.get("msg-id"), subInfo, msg)
    })

    chatClient.onGiftPaidUpgrade((channel, user, subInfo, msg) => {
      //if (process.env.NODE_ENV !== 'production') console.log(msg.tags.get("msg-id"), subInfo, msg)
    })

    chatClient.onCommunitySub((channel, user, subInfo, msg) => {
      //if (process.env.NODE_ENV !== 'production') console.log(msg.tags.get("msg-id"), subInfo, msg)
    })

    chatClient.onPrimeCommunityGift((channel, user, subInfo, msg) => {
      //if (process.env.NODE_ENV !== 'production') console.log(msg.tags.get("msg-id"), subInfo, msg)
    })

    await chatClient.connect();
  }

  const getInfoStreams = async () => {
    const infos = await client.helix.streams.getStreams({ userName: channels });
    setInfoStreams(infos.data);
  }

  useInterval(() => {
    getInfoStreams();
  }, 20000)

  useEffect(() => {
    getInfoStreams().then(() => chatListener());
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
          rowHeight={100}
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
          margin={[5, 5]}
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
