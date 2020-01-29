import React, { useState } from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import Popup from './Popup';

moment.locale('fr');

function Panel({ channel, chatThreads, scrollBarRefs, chatBans, infosStream, infosChannel, rooms, location }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const isLoad = [...chatThreads.keys()].find((k) => k === channel) && chatThreads.get(channel).length > 0;
  const isLoadRoom = rooms.find((room) => room === channel);

  return (
    <>
      {isPopupOpen && <Popup url={window.location + "chat/" + channel.replace('#', '')} chatThreadChannel={chatThreads.get(channel).slice(-200)} closePopup={() => setIsPopupOpen(false)} title={infosChannel && infosChannel['display_name']} />}
      <div className={"title" + (infosStream && infosStream.type === "live" ? " live" : "")} style={isLoadRoom ? { opacity: 1 } : {}} title={infosStream && `${moment.utc(moment() - moment(infosStream.started_at)).format("HH[h]mm")} - ${infosStream.viewer_count.toLocaleString('fr-FR', { minimumFractionDigits: 0 })} - ${infosStream.title}`}>
        <img draggable={false} style={{ height: 21, userSelect: "none", marginRight: 5 }} src={infosChannel && infosChannel.profile_image_url} alt="" /><span style={infosStream && infosStream.type === "live" && { color: "white", fontWeight: "bold" }}>{infosChannel && infosChannel['display_name']}</span>
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
        {chatBans.get(channel) && chatBans.get(channel).slice(-99).map(chatBan =>
          <div key={chatBan.id}>
            <p><small>({chatBan.ts})</small> <span style={{ color: chatBan.color }}>{chatBan.status}</span> <small>{chatBan.duration && moment.duration(parseInt(chatBan.duration), "seconds").humanize()}</small> : {chatBan.userName}</p>
            <ul>
              {chatBan.duration && parseInt(chatBan.duration) <= 600 ? chatBan.messages.slice(-1).map((message) =>
                <li key={message.id}><small>({message.ts})</small> {message.message}</li>
              ) : chatBan.messages.map((message) =>
                <li key={message.id}><small>({message.ts})</small> {message.message}</li>
              )}
            </ul>
          </div>
        )}
      </Scrollbar>
    </>
  )
}

export default withRouter(Panel);