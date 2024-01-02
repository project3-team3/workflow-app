import AuthService from "../utils/auth.js";
import { useQuery } from "@apollo/client";
import { useState } from "react";
// import ChatComponent from "../components/ChatComponent/ChatComponent.jsx";
import { QUERY_USER_SETTINGS } from "../utils/queries.js";
import BackButton from "../components/BackButton";
import PopUpModal from "../components/PopUpModal/index.jsx";

const Chat = () => {
  const userProfile = AuthService.getProfile();
  const { loading, error, data } = useQuery(QUERY_USER_SETTINGS, {
    variables: { userId: userProfile._id || userProfile.user._id },
  });

  // Wait for data to load
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const colorTheme = data.getUserSettings.currentTheme || "default-wf";

  const setMode = (mode) => {
    const htmlElement = document.querySelector("html");
    htmlElement.className = "";
    htmlElement.classList.add(mode);

    // Store theme preference in localStorage
    localStorage.setItem("colorTheme", mode);
  };

  setMode(colorTheme);

  /*
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [activity, setActivity] = useState("");
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const socket = io("http://localhost:3001");

  useEffect(() => {
    console.log("Attempting to connect...", socket);
    // Establish the socket connection
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    // Set up event listeners
    socket.on("message", (data) => {
      console.log("Received Message:", data);
      setChatMessages((prevMessages) => [...prevMessages, data]);
      setActivity("");
    });

    socket.on("activity", (activityName) => {
      setActivity(`${activityName} is typing...`);
      const timer = setTimeout(() => {
        setActivity("");
      }, 3000);
      return () => clearTimeout(timer);
    });

    socket.on("userList", ({ users }) => {
      setUsers(users);
    });

    socket.on("roomList", ({ rooms }) => {
      setRooms(rooms);
    });

    // Set up cleanup function
    return () => {
      console.log("Disconnecting socket...", socket);
      // Disconnect the socket when the component unmounts
      socket.disconnect();
    };
  }, [socket]);

  function newMessage(name, text) {
    console.log("Constructing message:", name, text);
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
    console.log("Sending message:", name, message, room);
    if (name && message && room && socket) {
      const constructedMsg = newMessage(name, message);
      console.log("Sending Message:", constructedMsg);
      socket.emit("message", {
        name: name,
        room: room,
        ...constructedMsg,
      });
      setMessage("");
    }
  };

  const enterRoom = (e, socket) => {
    e.preventDefault();
    if (name && room && socket) {
      console.log("Entering room:", name, room);
      socket.emit("enterRoom", {
        name: name,
        room: room,
      });
      setName("");
      setRoom("");
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") setName(value);
    else if (id === "room") setRoom(value);
    else if (id === "message") setMessage(value);
  };

  const renderMessages = () => {
    console.log("Rendering messages:", chatMessages);
    return chatMessages.map((msg, index) => (
      <div
        className={`message ${msg.name === name ? "sent" : "received"}`}
        key={index}
      >
        <div className="message-info">
          <span className="message-sender">{msg.name}</span>
          <span className="message-time">{msg.time}</span>
        </div>
        <div className="message-content">{msg.text}</div>
      </div>
    ));
  };
*/
  return (
    <div className="container">
      <div className="admin-message-wf">
        <h1>Chat</h1>
        <p>Coming soon!</p>
        <BackButton />
      </div>
    </div>
  );
};

//      <ChatComponent user={userProfile?.username} />

export default Chat;

/*
<div className="chat-display">
        <div className="message-container-wf">{renderMessages()}</div>
        <div className="chat-bottom-container-wf">
          <form
            className="message-form chat-bottom-bar-wf"
            onSubmit={sendMessage}
          >
            <input
              type="text"
              id="message"
              placeholder="Type a message"
              className="textbox-wf box-shadow-wf"
              value={message}
              onChange={handleInputChange}
            />
            <button
              className="waves-effect waves-light btn chat-button-wf button-wf"
              type="submit"
            >
              Send
            </button>
          </form>

          <form
            className="form-join chat-bottom-bar-wf"
            onSubmit={(e) => enterRoom(e, socket)}
          >
            <div className="chat-lower-form-wf">
              <input
                type="text"
                id="name"
                maxLength="20"
                placeholder="Your name"
                className="text-half-size-wf textbox-wf"
                required
                value={name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="room"
                placeholder="Chat room"
                className="text-half-size-wf textbox-wf"
                required
                value={room}
                onChange={handleInputChange}
              />
              <button
                id="join"
                className="waves-effect waves-light btn form-join-button-wf chat-button-wf button-wf"
                type="submit"
              >
                Join
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="chat-sidebar-wf">
        <div className="sidebar-inner-container-wf">
          <div className="user-list-wf">
            <p className="active-users-heading-wf">Active Users</p>
            <ul>
              {users.map((user, index) => (
                <li key={index}>{user.name}</li>
              ))}
            </ul>
          </div>

          <div className="room-list-wf">
            <p className="available-rooms-heading-wf">Available Rooms</p>
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
      </div>
      */
