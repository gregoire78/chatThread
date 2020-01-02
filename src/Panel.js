import React, { useState } from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import moment from 'moment';
import _ from 'lodash';
import Popup from './Popup';

moment.locale('fr');

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
        splitText.splice(mote[0], 1, `<div style="height: 1em;vertical-align: middle;display: inline-flex;align-items: center;justify-content: center;"><img data-for="emote" title="${datajson.title}" data-tip=${JSON.stringify(datajson)} class="emoticon" alt="${datajson.title}" src="http://static-cdn.jtvnw.net/emoticons/v1/${i}/1.0"></div> `);
      }
    }
  }
  return splitText.join('').replace(/(<img\s[^>]*>)(?: )(?=<)/igm, "$1").replace(/(?:^|\s)((?:http|https|ftp|ftps):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?)/g, " <a href=$1 target='_blank' style='color: white;vertical-align: middle;'>$1</a>");
}

function getUserColor(login) {
  const n = login.charCodeAt(0) + login.charCodeAt(login.length - 1);
  return defaultColors[n % defaultColors.length]
}

export default function Panel({ channel, chatThreads, scrollBarRefs, chatBans, infosStream, infosChannel, rooms }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const isLoad = [...chatThreads.keys()].find((k) => k === channel) && chatThreads.get(channel).length > 0;
  const isLoadRoom = rooms.find((room) => room.channel === channel);
  return (
    <>
      {isPopupOpen && <Popup closePopup={() => setIsPopupOpen(false)} title={infosChannel['display_name']}>
        <div style={{ fontFamily: "Roobert,Helvetica Neue,Helvetica,Arial,sans-serif" }}>
          {chatThreads.get(channel).slice(-200).map((chatThread) =>
            <p key={chatThread.id} style={{ overflowWrap: "break-word", margin: "10px 0", lineHeight: "1.5em" }}>
              <small style={{ color: "grey", verticalAlign: "middle", marginRight: 5 }}>
                {chatThread.ts}
              </small>
              {chatThread.badgesUser && <span>{chatThread.badgesUser.map((badgeUser, k) => { return <img style={{ verticalAlign: "middle", marginRight: 3 }} key={k} src={badgeUser && badgeUser.image_url_1x} alt="" title={(badgeUser.id === "subscriber" && `Abonné depuis ${chatThread.user['badge-info'].subscriber} mois`) || (badgeUser.id === "founder" && `Fondateur, abonné depuis ${chatThread.user['badge-info'].founder} mois`) || badgeUser.title} /> })}</span>}
              <span style={{ color: chatThread.user.color || getUserColor(chatThread.user.username), fontWeight: "bold", verticalAlign: "middle" }}>{chatThread.user["display-name"]}</span>&nbsp;
              <span style={chatThread.user["message-type"] === "action" ? { color: chatThread.user.color, verticalAlign: "middle" } : { verticalAlign: "middle" }} dangerouslySetInnerHTML={{ __html: formatEmotes(chatThread.message, chatThread.user.emotes) }} />
            </p>
          )}
        </div>
      </Popup>}
      <div className={"title" + (infosStream && infosStream.type === "live" ? " live" : "")} style={isLoadRoom ? { opacity: 1 } : {}} title={infosStream && `${moment.utc(moment() - moment(infosStream.started_at)).format("HH[h]mm")} - ${infosStream.viewer_count.toLocaleString('fr-FR', { minimumFractionDigits: 0 })} - ${infosStream.title}`}>
        <img draggable={false} style={{ height: 21, userSelect: "none", marginRight: 5 }} src={infosChannel.profile_image_url} alt="" /><span style={infosStream && infosStream.type === "live" && { color: "white", fontWeight: "bold" }}>{infosChannel['display_name']}</span>
        <button className={isPopupOpen ? "open" : ""} disabled={!isLoad} onClick={() => setIsPopupOpen(!isPopupOpen)}>chat</button>
      </div>

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
        {/*new Array(1000).fill(0).map((v,i) => <p key={i}>test</p>)*/}
        {chatBans.get(channel) && chatBans.get(channel).slice(-99).map(chatBan => {
          return (
            <div key={chatBan.id}>
              <p><small>({chatBan.ts})</small> <span style={{ color: chatBan.color }}>{chatBan.status}</span> <small>{chatBan.userstate['ban-duration'] && moment.duration(parseInt(chatBan.userstate['ban-duration']), "seconds").humanize()}</small> : {chatBan.username}</p>
              <ul>
                {chatBan.userstate['ban-duration'] && parseInt(chatBan.userstate['ban-duration']) <= 600 ? chatBan.messages.slice(-1).map((message) =>
                  <li key={message.id}><small>({message.ts})</small> {message.message}</li>
                ) : chatBan.messages.map((message) =>
                  <li key={message.id}><small>({message.ts})</small> {message.message}</li>
                )}
              </ul>
            </div>
          )
        })}
      </Scrollbar>
    </>
  )
}