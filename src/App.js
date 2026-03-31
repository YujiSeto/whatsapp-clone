import { useState, useEffect } from "react";
import "./App.css";
import Api from "./Api";

import ChatListItem from "./components/ChatListItem";
import ChatIntro from "./components/ChatIntro";
import ChatWindow from "./components/ChatWindow";

import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NewChat from "./components/NewChat";
import Login from "./components/Login";

const App = () => {
  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [user, setUser] = useState(null);
  const [showNewChat, setShowNewChat] = useState(false);

  const handleLoginData = async (u) => {
    let newUser = {
      id: u.uid || u.id,
      name: u.displayName || u.name,
      avatar: u.photoURL || u.avatar,
    };
    await Api.addUser(newUser);
    setUser(newUser);
  };

  useEffect(() => {
    if (user !== null) {
      let unsub = Api.onChatList(user.id, setChatList);
      return unsub;
    }
  }, [user]);

  if (user === null) {
    return <Login onReceive={handleLoginData} />;
  }

  const handleNewChat = () => {
    setShowNewChat(true);
  };

  const handleLogout = async () => {
    await Api.logout();
    setUser(null);
    setActiveChat({});
    setChatList([]);
  };

  return (
    <div
      className={`app-window${activeChat.chatId !== undefined ? " chat-open" : ""}`}
    >
      <div className="sidebar">
        <NewChat
          chatList={chatList}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
          setActiveChat={setActiveChat}
        />
        <header>
          <img
            className="header-avatar"
            src={user.avatar}
            alt={user.name}
            title={user.name}
          />
          <div className="header-buttons">
            <div className="header-btn" title="Status">
              <DonutLargeIcon style={{ color: "#919191" }} />
            </div>
            <div
              onClick={handleNewChat}
              className="header-btn"
              title="New Chat"
            >
              <ChatIcon style={{ color: "#919191" }} />
            </div>
            <div onClick={handleLogout} className="header-btn" title="Exit">
              <ExitToAppIcon style={{ color: "#919191" }} />
            </div>
            <div className="header-btn" title="More">
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
        {activeChat.chatId !== undefined && (
          <ChatWindow
            key={activeChat.chatId}
            user={user}
            data={activeChat}
            setActiveChat={setActiveChat}
          />
        )}
        {activeChat.chatId === undefined && <ChatIntro />}
      </div>
    </div>
  );
};

export default App;
