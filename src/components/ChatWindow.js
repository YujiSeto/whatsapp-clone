import { useState, useEffect, useRef } from "react";
import "./ChatWindow.css";

import EmojiPicker from "emoji-picker-react";
import MessageItem from "./MessageItem";

import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import Api from "../Api";

const ChatWindow = ({ user, data, setActiveChat }) => {
  const body = useRef();

  let recognition = null;
  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition !== undefined) {
    recognition = new SpeechRecognition();
  }

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [banTimeLeft, setBanTimeLeft] = useState(0);
  const [spamTracker, setSpamTracker] = useState([]);

  useEffect(() => {
    if (data.chatId !== undefined) {
      setList([]);
      let unsub = Api.onChatContent(data.chatId, setList, setUsers);
      return unsub;
    }
  }, [data.chatId]);

  useEffect(() => {
    if (body.current.scrollHeight > body.current.offsetHeight) {
      body.current.scrollTop =
        body.current.scrollHeight - body.current.offsetHeight;
    }
  }, [list]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (emojiOpen) {
          setEmojiOpen(false);
        } else {
          setActiveChat({});
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [emojiOpen, setActiveChat]);

  const handleCloseChat = () => {
    setActiveChat({});
  };

  const handleEmojiClick = (emojiObject) => {
    setText((prevText) => prevText + emojiObject.emoji);
  };

  const handleOpenEmoji = () => {
    setEmojiOpen(true);
  };

  const handleCloseEmoji = () => {
    setEmojiOpen(false);
  };

  const handleMicClick = () => {
    if (recognition !== null) {
      recognition.onstart = () => {
        setListening(true);
      };
      recognition.onend = () => {
        setListening(false);
      };
      recognition.onresult = (e) => {
        setText(e.results[0][0].transcript);
      };
      recognition.start();
    }
  };

  const handleInputKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleSendClick();
    }
  };

  const handleSendClick = async () => {
    if (text.trim() !== "" && !isBanned && !isSending) {
      if (text.length > 1000) {
        alert("Message too long! The limit is 1000 characters.");
        return;
      }

      const now = Date.now();
      const recentMessages = spamTracker.filter((t) => now - t < 3000);
      if (recentMessages.length >= 4) {
        setIsBanned(true);
        setBanTimeLeft(15);
        let timeLeft = 15;
        const timer = setInterval(() => {
          timeLeft--;
          setBanTimeLeft(timeLeft);
          if (timeLeft <= 0) {
            clearInterval(timer);
            setIsBanned(false);
            setSpamTracker([]);
          }
        }, 1000);
        return;
      }
      setSpamTracker([...recentMessages, now]);

      const currentText = text;
      setText("");
      setEmojiOpen(false);
      setIsSending(true);

      const badWords = [
        "porra",
        "caralho",
        "puta",
        "merda",
        "foda",
        "cu",
        "fuck",
        "shit",
        "bitch",
        "asshole",
        "dick",
        "cunt",
        "nigger",
        "slut",
      ];
      const regex = new RegExp(`\\b(${badWords.join("|")})\\b`, "gi");
      let cleanText = currentText.trim().replace(regex, "***");

      Api.sendMessage(data, user.id, "text", cleanText, users);

      setTimeout(() => setIsSending(false), 200);
    }
  };

  return (
    <div className="chatWindow">
      <div className="chatWindow--header">
        <div className="chatWindow--headerinfo">
          <img
            className="chatWindow--avatar"
            src={data.image}
            alt={data.title}
            title={data.title}
          />
          <div className="chatWindow--name">{data.title}</div>
        </div>
        <div className="chatWindow--headerbuttons">
          <div className="chatWindow--btn" title="Search">
            <SearchIcon style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow--btn" title="Attach File">
            <AttachFileIcon style={{ color: "#919191" }} />
          </div>
          <div
            className="chatWindow--btn"
            onClick={handleCloseChat}
            title="Close Chat"
          >
            <CloseIcon style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow--btn" title="More">
            <MoreVertIcon style={{ color: "#919191" }} />
          </div>
        </div>
      </div>
      <div ref={body} className="chatWindow--body">
        {list.map((item, key) => (
          <MessageItem key={key} data={item} user={user} />
        ))}
      </div>
      <div
        className="chatWindow--emojiarea"
        style={{ height: emojiOpen ? "40%" : "0px" }}
      >
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          searchDisabled
          skinTonesDisabled
          previewConfig={{
            showPreview: false,
          }}
        />
      </div>
      <div className="chatWindow--footer">
        <div className="chatWindow--pre">
          <div
            className="chatWindow--btn"
            onClick={handleCloseEmoji}
            style={{ width: emojiOpen ? "40px" : "0px" }}
          >
            <CloseIcon style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow--btn" onClick={handleOpenEmoji}>
            <InsertEmoticonIcon
              style={{ color: emojiOpen ? "#009688" : "#919191" }}
            />
          </div>
        </div>
        <div className="chatWindow--inputarea">
          <input
            className="chatWindow--input"
            type="text"
            placeholder={isBanned ? `Spam detected. Wait ${banTimeLeft}s...` : "Type a message"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyUp={handleInputKeyUp}
            disabled={isBanned}
            maxLength={1000}
            style={{ backgroundColor: isBanned ? "#ffcccc" : "" }}
          />
        </div>
        <div className="chatWindow--pos">
          {text === "" && (
            <div onClick={handleMicClick} className="chatWindow--btn">
              <MicIcon style={{ color: listening ? "#126ece" : "#919191" }} />
            </div>
          )}
          {text !== "" && (
            <div onClick={handleSendClick} className="chatWindow--btn">
              <SendIcon style={{ color: "#919191" }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
