import React from "react";
import "./Login.css";
import Api from "../Api";
import WhatsAppIcon from "../assets/whatsapp-logo.png";

function Login({ onReceive }) {
  const demoUsers = [
    {
      id: "demo_1",
      avatar: "https://www.w3schools.com/w3images/avatar1.png",
      name: "James Miller",
    },
    {
      id: "demo_2",
      avatar: "https://www.w3schools.com/w3images/avatar2.png",
      name: "Robert Brown",
    },
    {
      id: "demo_3",
      avatar: "https://www.w3schools.com/w3images/avatar3.png",
      name: "Michael Garcia",
    },
    {
      id: "demo_4",
      avatar: "https://www.w3schools.com/w3images/avatar4.png",
      name: "Sarah Wilson",
    },
    {
      id: "demo_5",
      avatar: "https://www.w3schools.com/w3images/avatar5.png",
      name: "Jessica Davis",
    },
    {
      id: "demo_6",
      avatar: "https://www.w3schools.com/w3images/avatar6.png",
      name: "Emily Martinez",
    },
  ];

  const handleGoogleLogin = async () => {
    let result = await Api.googlePopup();
    if (result) {
      onReceive(result.user);
    } else {
      alert("Login error! Please try again.");
    }
  };

  const handleDemoLogin = async (user) => {
    await Api.addUser(user);
    onReceive(user);
  };

  return (
    <div className="login">
      <div className="login-container">
        <img src={WhatsAppIcon} alt="WhatsApp Logo" className="login-logo" />
        <h1 className="login-title">WhatsApp Clone</h1>

        <button className="login-btn-google" onClick={handleGoogleLogin}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
          />
          Login with Google
        </button>

        <div className="login-divider">
          <span>OR LOGIN WITH DEMO</span>
        </div>

        <div className="login-demo-grid">
          {demoUsers.map((item, key) => (
            <div
              key={key}
              className="login-demo-item"
              onClick={() => handleDemoLogin(item)}
            >
              <img src={item.avatar} alt={item.name} />
              <span>{item.name.split(" ")[0]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="login-footer">
        © 2026 WhatsApp Clone - Developed by{" "}
        <a
          href="https://yujiseto.github.io"
          style={{ color: "#009688", textDecoration: "none" }}
        >
          YujiSeto
        </a>
      </div>
    </div>
  );
}

export default Login;
