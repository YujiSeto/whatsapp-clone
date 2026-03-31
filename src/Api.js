import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import firebaseConfig from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const TTL_DAYS = 30;

const Api = {
  googlePopup: async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      let result = await firebaseApp.auth().signInWithPopup(provider);
      return result;
    } catch (error) {
      console.error("Login error: ", error);
      return null;
    }
  },
  demoLogin: async () => {
    try {
      let result = await firebaseApp.auth().signInAnonymously();
      return result;
    } catch (error) {
      console.error("Anonymous login error: ", error);
      return null;
    }
  },
  logout: async () => {
    await firebaseApp.auth().signOut();
  },
  addUser: async (u) => {
    await db.collection("users").doc(u.id).set(
      {
        name: u.name,
        avatar: u.avatar,
      },
      { merge: true },
    );
  },
  getContactList: async (userId) => {
    let list = [];
    let results = await db.collection("users").limit(100).get();
    results.forEach((result) => {
      let data = result.data();
      if (result.id !== userId) {
        list.push({
          id: result.id,
          name: data.name,
          avatar: data.avatar,
        });
      }
    });
    return list;
  },
  addNewChat: async (user, user2) => {
    let u = await db.collection("users").doc(user.id).get();
    let uData = u.data();
    if (uData.chats) {
      for (let i in uData.chats) {
        if (uData.chats[i].with === user2.id) {
          return uData.chats[i];
        }
      }
    }

    let newChat = await db.collection("chats").add({
      users: [user.id, user2.id],
      createdAt: new Date(),
    });

    let newChatObjForUser = {
      chatId: newChat.id,
      title: user2.name,
      image: user2.avatar,
      with: user2.id,
    };

    await db
      .collection("users")
      .doc(user.id)
      .update({
        chats: firebase.firestore.FieldValue.arrayUnion(newChatObjForUser),
      });

    await db
      .collection("users")
      .doc(user2.id)
      .update({
        chats: firebase.firestore.FieldValue.arrayUnion({
          chatId: newChat.id,
          title: user.name,
          image: user.avatar,
          with: user.id,
        }),
      });

    return newChatObjForUser;
  },
  onChatList: (userId, setChatList) => {
    return db
      .collection("users")
      .doc(userId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          let data = doc.data();
          if (data.chats) {
            let chats = [...data.chats];
            chats.sort((a, b) => {
              if (a.lastMessageDate === undefined) return -1;
              if (b.lastMessageDate === undefined) return -1;
              if (a.lastMessageDate < b.lastMessageDate) return 1;
              if (a.lastMessageDate > b.lastMessageDate) return -1;
              return 0;
            });
            setChatList(chats);
          }
        }
      });
  },
  onChatContent: (chatId, setList, setUsers) => {
    let chatRef = db.collection("chats").doc(chatId);

    let unsubChat = chatRef.onSnapshot((doc) => {
      if (doc.exists) {
        let data = doc.data();
        setUsers(data.users || []);
      }
    });

    let unsubMessages = chatRef
      .collection("messages")
      .orderBy("date", "asc")
      .onSnapshot((snapshot) => {
        let messages = [];
        snapshot.forEach((doc) => {
          messages.push({ id: doc.id, ...doc.data() });
        });
        setList(messages);
      });

    return () => {
      unsubChat();
      unsubMessages();
    };
  },
  sendMessage: async (chatData, userId, type, body, users) => {
    let now = new Date();
    let expireAt = new Date(now.getTime() + TTL_DAYS * 24 * 60 * 60 * 1000);

    await db
      .collection("chats")
      .doc(chatData.chatId)
      .collection("messages")
      .add({
        type,
        author: userId,
        body,
        date: now,
        expireAt,
      });

    for (let i in users) {
      let u = await db.collection("users").doc(users[i]).get();
      let uData = u.data();
      if (uData.chats) {
        let chats = [...uData.chats];
        for (let e in chats) {
          if (chats[e].chatId === chatData.chatId) {
            chats[e].lastMessage = body;
            chats[e].lastMessageDate = now;
            break;
          }
        }
        await db.collection("users").doc(users[i]).update({ chats });
      }
    }
  },
};

export default Api;
