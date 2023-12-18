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