# WhatsApp Clone (Web)

A realistic and fully functional WhatsApp Web clone built from the ground up using **React.js** and **Firebase**. This project features real-time messaging, real authentication, and a dedicated demo environment to quickly test functionalities.

---

## 🌟 Key Features

- **Real-Time Messaging**: Engage in instant messaging powered by Firebase Cloud Firestore.
- **Google Authentication**: Fully integrated, secure, and seamless login flow utilizing Firebase Auth.
- **Demo Login System**: Easily test chat scenarios without external accounts by logging in as one of the 6 pre-configured Demo Users directly from the login screen.
- **Premium UI**: Crafted to closely match the official WhatsApp Web aesthetic, ensuring a polished and intuitive user experience.
- **Secure Architecture**: Firebase credentials are securely managed via `.env` variables, preventing exposure on GitHub or unauthorized usage.

## 🛠️ Technologies Used

- **Frontend**: React.js (Hooks, Functional Components)
- **Database Backend**: Firebase Cloud Firestore (NoSQL)
- **Authentication**: Firebase Authentication (Google Auth Provider)
- **Icons Elements**: Material-UI (MUI) Icons
- **Styling**: Vanilla CSS (Flexbox, CSS Grid)

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
3. The app will bypass the external authentication and register the chosen identity into the Firestore database, allowing you to instantly chat with other connected clients.

## 📝 About

Developed by [YujiSeto](https://yujiseto.github.io) for educational purposes and portfolio building. 
