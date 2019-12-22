import React, { useEffect, useState, useRef } from 'react';
import tmi from 'tmi.js';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/fr';
import uuid from 'uuid/v4';
import axios from 'axios';
import './App.css';

moment.locale('fr');

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
    'zerator'];

  const [connecting, setConnecting] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [chatThreads, _setChatThreads] = useState(new Map());
  const [chatBans, _setBans] = useState(new Map());
  const [infoStreams, setInfoStreams] = useState([]);
  const myStateRef = useRef(chatThreads);
  const chatBansRef = useRef(chatBans);
  const setChatThreads = (channel, chat) => {
    _setChatThreads(prevState => {
      const y = prevState.get(channel)
      return myStateRef.current = new Map(prevState).set(channel, y ? [...y.slice(-199), chat] : [chat]);
    });
  };
  const setChatBans = (channel, ban) => {
    _setBans(prevState => {
      const y = prevState.get(channel)
      return chatBansRef.current = new Map(prevState).set(channel, y ? [...y.slice(-99), ban] : [ban]);
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
      console.log("%croomstate", 'color:green;', channel, state)
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
      //this.chatComponent.current.scrollToBottom();
    });

    client.on("timeout", (channel, username, reason, duration, userstate) => {
      //const channelDetails = _.find(channelsDetails, ['channel', channel.slice(1)]);
      const messages = myStateRef.current.get(channel).filter((message) => message.user ? username === message.user.username : false);
      let to = { id: uuid(), status: "timeout", username, channel, reason, duration, ts_global: moment().valueOf(), messages, userstate, color: 'orange' };
      console.log("%ctimeout", 'color: orange', channel, username, to);
      setChatBans(channel, to);
      //setChatThreads([...chatThreads.slice(-199), to]);
      //this.openNotification(`${channel} TO`, `${username} est reduit au silence pour ${duration}s`, channelDetails.infoChannel.profile_image_url)
      //this.chatComponent.current.scrollToBottom();
    });

    client.on("ban", (channel, username, reason, userstate) => {
      //const channelDetails = _.find(channelsDetails, ['channel', channel.slice(1)]);
      const messages = myStateRef.current.get(channel).filter((message) => message.user ? username === message.user.username : false)
      let ban = { id: uuid(), status: "ban", username, channel, reason, ts_global: moment().valueOf(), messages, userstate, color: 'red' };
      console.log("%cban", 'color: red', channel, username, ban);
      setChatBans(channel, ban);
      //setChatThreads([...chatThreads.slice(-199), ban]);
      //this.openNotification(`${channel} BANNED`, `${username} est banni`, channelDetails.infoChannel.profile_image_url)
      //this.chatComponent.current.scrollToBottom();
    });

    client.on("messagedeleted", (channel, username, deletedMessage, userstate) => {
      let chat = { id: uuid(), status: "message", message: deletedMessage, channel, ts: (userstate["tmi-sent-ts"] ? moment(userstate["tmi-sent-ts"], "x").format('LT') : moment().format('LT')), ts_global: moment().valueOf() };
      let messageDeleted = { id: uuid(), status: "messagedeleted", username, channel, ts_global: moment().valueOf(), messages: [chat], userstate, color: 'grey' };
      console.log("%cmessagedeleted", 'color: orange', channel, username, messageDeleted);
      setChatBans(channel, messageDeleted);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //useEffect(() => console.log(infoStreams), [infoStreams])

  return (
    <div className="App">
      {connecting ? <p>connecting to chat irc</p> :
        <div>
          {/*{[...chatThreads.keys()].map((channel) => {
            return (
              <div key={channel}>
                <p>{channel}</p>
                {chatThreads.get(channel).map(chatThread => <p key={chatThread.id}>{chatThread.message}</p>)}
              </div>)
          })}
        <hr />*/}

          {[...chatThreads.keys()].map((channel) => {
            const infos = infoStreams.find((infoStream) => "#" + infoStream.user_name.toLowerCase() === channel);
            return (
              <div className="channel" key={channel}>
                <p>{channel}<span>{infos && infos.type === "live" && "🔴"}</span></p>
                <div style={{ maxHeight: 500, overflow: 'auto' }}>
                  {chatBans.get(channel) && chatBans.get(channel).map(chatBan => {
                    return <div key={chatBan.id}>
                      <p><span style={{ color: chatBan.color }}>{chatBan.status}</span> : {chatBan.username} {chatBan.userstate['ban-duration'] && moment.duration(parseInt(chatBan.userstate['ban-duration']), "seconds").humanize()}</p>
                      <ul>
                        {chatBan.messages.map((message) =>
                          <li key={message.id}>({message.ts}) {message.message}</li>
                        )}
                      </ul>
                    </div>
                  })}
                </div>
              </div>)
          })}
        </div>}
    </div>
  );
}

export default App;
