/*
import { useState, useEffect } from "react";
const firebase = require("../../../../server/utils/firebase");
*/


/*
const ChatComponent = ({ user }) => {

  
  var firebaseConfig = {
    apiKey: "xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx",
    authDomain: "xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx",
    databaseURL: "xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx",
    projectId: "xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx",
    storageBucket: "xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx",
    messagingSenderId: "xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx",
    appId: "xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx",
  };
  
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.database();
  
  const username = prompt("Please Tell Us Your Name");
  */
  /*
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const messagesRef = firebase.database().ref("messages");

    messagesRef.on("value", (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messagesArray = Object.values(messagesData);
        setMessages(messagesArray);
      }
    });

    return () => {
      messagesRef.off("value");
    };
  }, []);

  const handleSendMessage = () => {
    const messagesRef = firebase.database().ref("messages");
    const newMessageData = {
      sender: user,
      content: newMessage,
    };
    messagesRef.push(newMessageData);
    setNewMessage("");
  };
*/

/*
  return (
    <div>
      <div id="chat">
        <ul id="messages"></ul>
        <form id="message-form">
          <input id="message-input" type="text" />
          <button id="message-btn" type="submit">
            Send
          </button>
        </form>
      </div>

      <script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-database.js"></script>
    </div>
  );
};

export default ChatComponent;
*/

/*
<div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}:</strong> {message.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
*/
