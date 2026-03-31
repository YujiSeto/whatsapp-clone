# WhatsApp Clone (Web & Mobile)

A highly realistic and fully functional WhatsApp Web clone built from the ground up using **React.js** and **Firebase**. This project goes beyond basic messaging by featuring a truly responsive layout, real-time Firestore synchronization, advanced chat features, and a dedicated demo environment for quick testing.

---

## 🌟 Key Features

- **📱 Fully Responsive Design**: Seamlessly adapts to any screen size. On mobile devices, it perfectly mimics the native app behavior by smoothly sliding between the chat list sidebar and the active chat window, ensuring an optimized mobile experience.
- **⚡ Real-Time Messaging**: Engage in instant messaging powered by Firebase Cloud Firestore, featuring dynamic real-time sorting of the chat list based on the latest messages.
- **🔐 Google & Demo Authentication**: Includes a secure and seamless login flow utilizing Firebase Auth via Google. It also features a built-in **Demo Login System** — easily test chat scenarios by selecting one of the 6 pre-configured avatars to bypass external authentication.
- **🎤 Speech-to-Text Input**: Integrated Web Speech API allows users to dictate messages using their microphone directly into the chat input.
- **😀 Emoji Picker**: Fully integrated emoji support using `emoji-picker-react` for a richer messaging experience.
- **🛡️ Advanced Moderation & Spam Protection**:
  - **Profanity Filter**: Automatically detecting and censoring bad words.
  - **Anti-Spam System**: Tracks message frequency and instantly applies a temporary ban (timeout) if a user sends messages too rapidly.
- **✨ Premium UI**: Crafted to closely match the official WhatsApp aesthetic, complete with CSS gradients, custom scrollbars, and fluid animations.

## 🛠️ Technologies Used

- **Frontend**: React.js (Hooks, Functional Components)
- **Database Backend**: Firebase Cloud Firestore (NoSQL)
- **Authentication**: Firebase Authentication (Google Auth Provider & Anonymous Login)
- **Icons Elements**: Material-UI (MUI) Icons
- **Styling**: Vanilla CSS (Flexbox, CSS Grid, Media Queries)
- **Add-ons**: Web Speech API, `emoji-picker-react`

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and `npm` installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YujiSeto/whatsapp-clone.git
   cd whatsapp-clone
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Setup Firebase Environment:**
   - Locate the `.env.example` file in the root directory.
   - Create a copy of it and rename the new file strictly to `.env`.
   - Open `.env` and replace the placeholder values with your actual Firebase project credentials.

4. **Start the development server:**
   ```bash
   npm start
   ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## 💡 How to Test (Demo Mode)

If you just want to test the chat behavior without setting up multiple Google accounts:
1. Start the app and wait for the Login Screen.
2. Under the Google Login button, select any of the pre-configured avatars (e.g., James Miller, Robert Brown).
3. The app will bypass the external authentication and register the chosen identity into the Firestore database, allowing you to instantly interact with the application.

## 📝 About

Developed by [YujiSeto](https://yujiseto.github.io) for educational purposes and portfolio building.
