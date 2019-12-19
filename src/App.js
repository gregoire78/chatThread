import React, { useEffect, useState, useRef } from 'react';
import tmi from 'tmi.js';
import _ from 'lodash';
import moment from 'moment';
import uuid from 'uuid/v4';
const client = new tmi.client({
  connection: {
    secure: true,
    reconnect: true
  },
  channels: ['sardoche', 'gotaga', 'loeya', 'mistermv', 'ponce', 'shaunz', 'peteur_pan', 'domingo', 'squeezielive']
});
function App() {

  const [connecting, setConnecting] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [chatThreads, _setChatThreads] = useState(new Map());
  const [chatBans, _setBans] = useState(new Map());
  const myStateRef = useRef(chatThreads);
  const chatBansRef = useRef(chatBans);
  const setChatThreads = (channel, chat) => {
    _setChatThreads(prevState => {
      const y = prevState.get(channel)
      return myStateRef.current = new Map(prevState).set(channel, y ? [...y.slice(-99), chat] : [chat]);
    });
  };
  const setChatBans = (channel, ban) => {
    _setBans(prevState => {
      const y = prevState.get(channel)
      return chatBansRef.current = new Map(prevState).set(channel, y ? [...y.slice(-99), ban] : [ban]);
    });
  };

  useEffect(() => {

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
      let to = { id: uuid(), status: "to", username, channel, reason, duration, ts_global: moment().valueOf(), messages };
      console.log("%cto", 'color: orange', channel, username, reason, userstate, messages);
      setChatBans(channel, to);
      //setChatThreads([...chatThreads.slice(-199), to]);
      //this.openNotification(`${channel} TO`, `${username} est reduit au silence pour ${duration}s`, channelDetails.infoChannel.profile_image_url)
      //this.chatComponent.current.scrollToBottom();
    });

    client.on("ban", (channel, username, reason, userstate) => {
      //const channelDetails = _.find(channelsDetails, ['channel', channel.slice(1)]);
      const messages = myStateRef.current.get(channel).filter((message) => message.user ? username === message.user.username : false)
      let ban = { id: uuid(), status: "ban", username, channel, reason, ts_global: moment().valueOf(), messages };
      console.log("%cban", 'color: red', channel, username, reason, userstate, messages);
      setChatBans(channel, ban);
      //setChatThreads([...chatThreads.slice(-199), ban]);
      //this.openNotification(`${channel} BANNED`, `${username} est banni`, channelDetails.infoChannel.profile_image_url)
      //this.chatComponent.current.scrollToBottom();
    });

    client.on("messagedeleted", (channel, username, deletedMessage, userstate) => {
      console.log("%cmessagedeleted", 'color: orange', channel, username, deletedMessage, userstate)
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {[...chatBans.keys()].map((channel) => {
            return (
              <div key={channel}>
                <p>{channel}</p>
                {chatBans.get(channel).map(chatBan => <p key={chatBan.id}>{chatBan.username}</p>)}
              </div>)
          })}
        </div>}
    </div>
  );
}

export default App;
