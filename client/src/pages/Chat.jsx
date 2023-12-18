import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import '../styles/chat.css';

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [activity, setActivity] = useState('');
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  
  const socket = io();

  useEffect(() => {
    socket.on('message', (data) => {
      console.log('Received Message:', data);
      setChatMessages(prevMessages => [...prevMessages, data]);
      setActivity('');
    });

    socket.on('activity', (activityName) => {
      setActivity(`${activityName} is typing...`);
      const timer = setTimeout(() => {
        setActivity('');
      }, 3000);
      return () => clearTimeout(timer);
    });

    socket.on('userList', ({ users }) => {
      setUsers(users);
    });

    socket.on('roomList', ({ rooms }) => {
      setRooms(rooms);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  function newMessage(name, text) {
    return {
      name,
      text,
      time: new Intl.DateTimeFormat("default", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(new Date()),
    };
  }

  const sendMessage = (e) => {
    e.preventDefault();
    if (name && message && room && socket) {
      const constructedMsg = newMessage(name, message);
      console.log('Sending Message:', constructedMsg);
      socket.emit('message', {
        name: name,
        room: room,
        ...constructedMsg,
      });
      setMessage('');
    }
  };

  const enterRoom = (e) => {
    e.preventDefault();
    if (name && room && socket) {
      console.log('Entering Room:', { name, room });
      socket.emit('enterRoom', {
        name: name,
        room: room,
      });
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'name') setName(value);
    else if (id === 'room') setRoom(value);
    else if (id === 'message') setMessage(value);
  };

  const renderMessages = () => {
    return chatMessages.map((msg, index) => (
      <div className={`message ${msg.name === name ? 'sent' : 'received'}`} key={index}>
        <div className="message-info">
          <span className="message-sender">{msg.name}</span>
          <span className="message-time">{msg.time}</span>
        </div>
        <div className="message-content">{msg.text}</div>
      </div>
    ));
  };

  return (
    <div className="chat-container">

    <div className="sidebar">
        <div className="userList">
          <h2>Active Users</h2>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user.name}</li>
            ))}
          </ul>
        </div>

        <div className="room-list">
          <h2>Available Rooms</h2>
          <ul>
            {rooms.map((room, index) => (
              <li key={index}>{room}</li>
            ))}
          </ul>
        </div>

        <div className="activity-display">
          <p>{activity}</p>
        </div>
      </div>
      <div className="chat-display">
        <div className="message-container">{renderMessages()}</div>


      <form className="message-form" onSubmit={sendMessage}>
        <input
          type="text"
          id="message"
          placeholder="Type a message"
          value={message}
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
      </form>

      <form className="form-join" onSubmit={enterRoom}>
        <input
          type="text"
          id="name"
          maxLength="20"
          placeholder="Your name"
          required
          value={name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="room"
          placeholder="Chat room"
          required
          value={room}
          onChange={handleInputChange}
        />
        <button id="join" type="submit">
          Join
        </button>
      </form>
    </div>
    </div>
  );
};

export default Chat;