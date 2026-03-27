import React from "react";
import "./ChatWindow.css";

import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";

export default () => {
  return (
    <div className="chatWindow">
      <div className="chatWindow--header">
        <div className="chatWindow--headerinfo">
          <img
            className="chatWindow--avatar"
            src="https://www.w3schools.com/w3images/avatar2.png"
            alt=""
          />
          <div className="chatWindow--name">User Name</div>
        </div>
        <div className="chatWindow--headerbuttons">
          <div className="chatWindow--btn">
            <SearchIcon style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow--btn">
            <AttachFileIcon style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow--btn">
            <MoreVertIcon style={{ color: "#919191" }} />
          </div>
        </div>
      </div>
      <div className="chatWindow--body"></div>
      <div className="chatWindow--footer">
        <div className="chatWindow--pre">
          <InsertEmoticonIcon style={{ color: "#919191" }} />
        </div>
        <div className="chatWindow--inputarea">
          <input className="chatWindow--input" type="text" placeholder="Type a message" />
        </div>
        <div className="chatWindow--pos">
          <SendIcon style={{ color: "#919191" }} />
        </div>
      </div>
    </div>
  );
};
