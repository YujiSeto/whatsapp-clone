import React from 'react';
import './ChatListItem.css';

const ChatListItem = () => {
  return (
    <div className="chatListItem">
      <img className="chatListItem--avatar" src="https://www.w3schools.com/w3images/avatar2.png" alt="" />
      <div className="chatListItem--lines">
        <div className="chatListItem--line">
          <div className="chatListItem--name">Contact Name</div>
          <div className="chatListItem--date">10:00</div>
        </div>
        <div className="chatListItem--line">
          <div className="chatListItem--lastMessage">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatListItem;