import React, { useState, useEffect } from "react";
import "./ChatListItem.css";

const ChatListItem = ({ onClick, active, data }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    if (data.lastMessageDate) {
      let d = data.lastMessageDate.seconds
        ? new Date(data.lastMessageDate.seconds * 1000)
        : data.lastMessageDate.toDate
          ? data.lastMessageDate.toDate()
          : new Date(data.lastMessageDate);
      let hours = d.getHours();
      let minutes = d.getMinutes();
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      setTime(`${hours}:${minutes}`);
    }
  }, [data]);

  return (
    <div className={`chatListItem ${active ? "active" : ""}`} onClick={onClick}>
      <img className="chatListItem--avatar" src={data.image} alt="" />
      <div className="chatListItem--lines">
        <div className="chatListItem--line">
          <div className="chatListItem--name">{data.title}</div>
          <div className="chatListItem--date">{time}</div>
        </div>
        <div className="chatListItem--line">
          <div className="chatListItem--lastMessage">
            <p>{data.lastMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
