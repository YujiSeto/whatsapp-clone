import React, { useState /*, useEffect*/ } from "react";
import "./App.css";

import ChatListItem from "./components/ChatListItem";
import ChatIntro from "./components/ChatIntro";
import ChatWindow from "./components/ChatWindow";

import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";

const App = () => {
  const [chatList, setChatList] = useState([
    {
      chatId: 1,
      title: "James Miller",
      image: "https://www.w3schools.com/w3images/avatar1.png",
      lastMessage: "I'll be there in 5 minutes! I'm just finishing up some things at the office.",
      time: "19:45",
    },
    {
      chatId: 2,
      title: "Robert Brown",
      image: "https://www.w3schools.com/w3images/avatar2.png",
      lastMessage: "Did you see the latest news about the framework update? It looks promising.",
      time: "19:00",
    },
    {
      chatId: 3,
      title: "Michael Garcia",
      image: "https://www.w3schools.com/w3images/avatar3.png",
      lastMessage: "Can we reschedule our meeting to tomorrow morning? I have an urgent matter to attend to.",
      time: "18:15",
    },
    {
      chatId: 4,
      title: "Sarah Wilson",
      image: "https://www.w3schools.com/w3images/avatar4.png",
      lastMessage: "That sounds like a great idea! Let's discuss the details when we meet.",
      time: "17:30",
    },
    {
      chatId: 5,
      title: "Jessica Davis",
      image: "https://www.w3schools.com/w3images/avatar5.png",
      lastMessage: "I'm heading out now. I'll catch you later this evening for our regular call.",
      time: "16:45",
    },
    {
      chatId: 6,
      title: "Emily Martinez",
      image: "https://www.w3schools.com/w3images/avatar6.png",
      lastMessage: "See you later! Don't forget to send me the files.",
      time: "15:00",
    },
  ]);
  const [activeChat, setActiveChat] = useState({});

  return (
    <div className="app-window">
      <div className="sidebar">
        <header>
          <img
            className="header-avatar"
            src="https://www.w3schools.com/w3images/avatar2.png"
            alt=""
          />
          <div className="header-buttons">
            <div className="header-btn">
              <DonutLargeIcon style={{ color: "#919191" }} />
            </div>
            <div className="header-btn">
              <ChatIcon style={{ color: "#919191" }} />
            </div>
            <div className="header-btn">
              <MoreVertIcon style={{ color: "#919191" }} />
            </div>
          </div>
        </header>

        <div className="search">
          <div className="search-input">
            <SearchIcon style={{ color: "#919191" }} />
            <input type="search" placeholder="Search or start new chat" />
          </div>
        </div>

        <div className="chatlist">
          {chatList.map((item, key) => (
            <ChatListItem
              key={key}
              data={item}
              active={activeChat.chatId === chatList[key].chatId}
              onClick={() => setActiveChat(chatList[key])}
            />
          ))}
        </div>
      </div>
      <div className="contentarea">
        {activeChat.chatId !== undefined && <ChatWindow />}
        {activeChat.chatId === undefined && <ChatIntro />}
      </div>
    </div>
  );
};

export default App;
