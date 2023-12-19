import { useState, useEffect } from 'react';
import firebase from '../../../../server/utils/firebase';

const ChatComponent = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const messagesRef = firebase.database().ref('messages');

    messagesRef.on('value', (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messagesArray = Object.values(messagesData);
        setMessages(messagesArray);
      }
    });

    return () => {
      messagesRef.off('value');
    };
  }, []);

  const handleSendMessage = () => {
    const messagesRef = firebase.database().ref('messages');
    const newMessageData = {
      sender: user,
      content: newMessage,
    };
    messagesRef.push(newMessageData);
    setNewMessage('');
  };

  return (
    <div>
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
    </div>
  );
};

export default ChatComponent;
