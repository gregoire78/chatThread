import React, { useState } from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import Popup from './Popup';

moment.locale('fr');

function Panel({ channel, chatThreads, scrollBarRefs, chatBans, infosStream, infosChannel, rooms }) {
  const channelTag = "#" + channel;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [statusSelector, setStatusSelector] = useState(["ban", "messagedeleted", "timeout"])
  const isLoad = [...chatThreads.keys()].find((k) => k === channelTag) && chatThreads.get(channelTag).length > 0;
  const loadedRoom = rooms.find((room) => room === channel);

  const handleFilter = (e) => {
    if (e.target.checked) {
      setStatusSelector([...statusSelector, e.target.value]);
    } else {
      const index = statusSelector.indexOf(e.target.value);
      if (index !== -1) {
        const array = [...statusSelector];
        array.splice(index, 1);
        setStatusSelector(array);
      }
    }
  }

  return (
    <>
      {isPopupOpen && <Popup url='/chat' chatThreadChannel={chatThreads.get(channelTag)} closePopup={() => setIsPopupOpen(false)} title={infosChannel && infosChannel.displayName} />}
      <div className={"title" + (infosStream && infosStream.type === "live" ? " live" : "")} style={loadedRoom ? { opacity: 1 } : {}} title={infosStream && `${moment.utc(moment() - moment(infosStream.startDate)).format("HH[h]mm")} - ${infosStream.viewers.toLocaleString('fr-FR', { minimumFractionDigits: 0 })} - ${infosStream.title}`}>
        <img draggable={false} style={{ height: 21, userSelect: "none", marginRight: 5 }} src={infosChannel && infosChannel.profilePictureUrl} alt="" /><span style={infosStream && infosStream.type === "live" && { color: "white", fontWeight: "bold" }}>{infosChannel && infosChannel.displayName}</span>
        <button className={isPopupOpen ? "open" : ""} disabled={!isLoad} onClick={() => setIsPopupOpen(!isPopupOpen)}>chat</button>
      </div>

      <div style={{ display: "flex", background: "#d3d3d34d", overflow: "hidden", opacity: loadedRoom ? 1 : 0, whiteSpace: "nowrap" }}>
        <label className="label-filter" style={{ color: "red" }}><input type="checkbox" value="ban" defaultChecked={true} onClick={handleFilter} /> <small>ban</small></label>
        <label className="label-filter" style={{ color: "darkorange" }}><input type="checkbox" value="timeout" defaultChecked={true} onClick={handleFilter} /> <small>timeout</small></label>
        <label className="label-filter" style={{ color: "blue" }}><input type="checkbox" value="messagedeleted" defaultChecked={true} onClick={handleFilter} /> <small>msg supp</small></label>
      </div>

      <Scrollbar
        ref={(item) => scrollBarRefs.current.set(channelTag, item)}
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
        style={{ height: 'calc(100% - 21px - 19px)' }}
      >
        {/*new Array(1000).fill(0).map((v,i) => <p key={i}>test</p>)*/}
        {chatBans.get(channelTag) && chatBans.get(channelTag).filter(v => statusSelector.includes(v.status)).slice(-99).map(chatBan =>
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