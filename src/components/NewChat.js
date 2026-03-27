import React, { useState } from "react";
import "./NewChat.css";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NewChat = ({ user, chatList, show, setShow }) => {
  const [list /*setList*/] = useState([
    {
      id: 1,
      avatar: "https://www.w3schools.com/w3images/avatar1.png",
      name: "James Miller",
    },
    {
      id: 2,
      avatar: "https://www.w3schools.com/w3images/avatar2.png",
      name: "Robert Brown",
    },
    {
      id: 3,
      avatar: "https://www.w3schools.com/w3images/avatar3.png",
      name: "Michael Garcia",
    },
    {
      id: 4,
      avatar: "https://www.w3schools.com/w3images/avatar4.png",
      name: "Sarah Wilson",
    },
    {
      id: 5,
      avatar: "https://www.w3schools.com/w3images/avatar5.png",
      name: "Jessica Davis",
    },
    {
      id: 6,
      avatar: "https://www.w3schools.com/w3images/avatar6.png",
      name: "Emily Martinez",
    },
  ]);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="newChat" style={{left: show ? 0 : -415}}>
      <div className="newChat--head">
        <div onClick={handleClose} className="newChat-backbutton">
          <ArrowBackIcon style={{ color: "#fff" }} />
        </div>
        <div className="newChat-headtitle">New Chat</div>
      </div>
      <div className="newChat--list">
        {list.map((item, key) => (
          <div className="newChat--item" key={key}>
            <img
              className="newChat--item--avatar"
              src={item.avatar}
              alt={item.name}
            />
            <div className="newChat--item--name">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewChat;
