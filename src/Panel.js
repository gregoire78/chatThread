import React, { useState } from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import moment from 'moment';
import Popup from './Popup';

moment.locale('fr');

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
        splitText.splice(mote[0], 1, `<img data-for="emote" data-tip=${JSON.stringify(datajson)} style="vertical-align: middle;margin: -0.5% 0;display: inline-block;" class="emoticon" alt="${datajson.title}" src="http://static-cdn.jtvnw.net/emoticons/v1/${i}/1.0"> `);
      }
    }
  }
  return splitText.join('').replace(/(<img\s[^>]*>)(?: )(?=<)/igm, "$1").replace(/(?:^|\s)((?:http|https|ftp|ftps):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?)/g, " <a href=$1 target='_blank' style='color: black;vertical-align: middle;'>$1</a>");
}

export default function Panel({ channel, chatThreads, scrollBarRefs, chatBans, infos, rooms }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const isLoad = [...chatThreads.keys()].find((k) => k === channel);
  const isLoadRoom = rooms.find((room) => room.channel === channel);
  return (
    <>
      {isPopupOpen && <Popup closePopup={() => setIsPopupOpen(false)} title={channel}>
        <div style={{ fontFamily: "Roobert,Helvetica Neue,Helvetica,Arial,sans-serif" }}>
          {chatThreads.get(channel).slice(-200).map((chatThread) =>
            <p key={chatThread.id} style={{ minHeight: "28px", overflowWrap: "break-word", margin: 0 }}>
              <small style={{ color: "grey", verticalAlign: "middle", lineHeight: "28px" }}>
                {chatThread.ts}
              </small>
              <span style={{ color: chatThread.user.color, fontWeight: "bold", verticalAlign: "middle", lineHeight: "28px", margin: "auto 10px" }}>{chatThread.user["display-name"]}</span>
              <span style={chatThread.user["message-type"] === "action" ? { color: chatThread.user.color, verticalAlign: "top", lineHeight: "28px" } : { verticalAlign: "top", lineHeight: "28px" }} dangerouslySetInnerHTML={{ __html: formatEmotes(chatThread.message, chatThread.user.emotes) }} />
            </p>
          )}
        </div>
      </Popup>}
      <div className="title" style={isLoadRoom ? { opacity: 1 } : {}} title={infos && `${moment.utc(moment() - moment(infos.started_at)).format("HH[h]mm")} - ${infos.viewer_count.toLocaleString('fr-FR', { minimumFractionDigits: 0 })}`}>
        <span>{infos && infos.type === "live" && "🔴"}</span>{channel}
        <button className={isPopupOpen ? "open" : ""} disabled={!isLoad} onClick={() => setIsPopupOpen(true)}>chat</button>
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
                {chatBan.messages.map((message) =>
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