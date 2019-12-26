import React, { useState } from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import moment from 'moment';
import Popup from './Popup';

moment.locale('fr');

export default function Panel({ channel, chatThreads, scrollBarRefs, chatBans, infos }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const isLoad = [...chatThreads.keys()].find((k) => k === channel);
  return (
    <>
      {isPopupOpen && <Popup closePopup={() => setIsPopupOpen(false)}>
        <p>test</p>
      </Popup>}
      <div className="title" style={isLoad ? { opacity: 1 } : {}} title={infos && `${moment.utc(moment() - moment(infos.started_at)).format("HH[h]mm")} - ${infos.viewer_count.toLocaleString('fr-FR', { minimumFractionDigits: 0 })}`}>
        {channel}<span>{infos && infos.type === "live" && "🔴"}</span>
        <button disabled={!isLoad} onClick={() => setIsPopupOpen(true)}>chat</button>
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