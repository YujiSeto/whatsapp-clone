import React from "react";
import "./ChatIntro.css";
import IntroImage from "../assets/intro-connection.jpg";

export default () => {
  return (
    <div className="chatIntro">
      <img src={IntroImage} alt="WhatsApp Intro" />
      <h1>Keep your phone connected</h1>
      <h2>
        WhatsApp connects to your phone to sync your messages.
        <br />
        To reduce data usage, connect your phone to Wi-Fi.
      </h2>
    </div>
  );
};
