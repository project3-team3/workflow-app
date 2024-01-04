// Text Chat page
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import AuthService from "../utils/auth.js";
import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { QUERY_USER_SETTINGS } from "../utils/queries.js";
import { GENERATE_STREAM_TOKEN } from "../utils/mutations.js";

import LoadingSpinner from "../components/LoadingSpinner/index.jsx";
import PopUpModal from "../components/PopUpModal/index.jsx";

// Import Stream Ui CSS rules
import "stream-chat-react/dist/css/v2/index.css";

const TextChat = () => {
  // Get user profile
  const userProfile = AuthService.getProfile();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [channelName, setChannelName] = useState("");
  const [userReady, setUserReady] = useState(false);
  const [activeChat, setActiveChat] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [generateStreamToken] = useMutation(GENERATE_STREAM_TOKEN);

  const user = {
    id: userProfile.username || userProfile.user.username,
    name: userProfile.username || userProfile.user.username,
  };

  const apiKey = "dz5f4d5kzrue"; // API Key not secret

  useEffect(() => {
    const generateTokenAndConnect = async () => {
      // Generate Stream Authenticated Token
      const tokenPromise = generateStreamToken({
        variables: { username: user.id },
      });

      // Connect to Stream Chat Client
      tokenPromise
        .then((data) => {
          const userToken = data.data.generateStreamToken;
          return userToken;
        })
        .then((userToken) => {
          const client = new StreamChat(apiKey);
          client.connectUser(user, userToken);
          return client;
        })
        .then((client) => {
          const userChannel = client.channel(
            "messaging",
            `workflow-wf-${channelName}`,
            {
              name: channelName,
              members: [user.id],
            }
          );
          setChatClient(client);
          return userChannel;
        })
        .then((userChannel) => {
          setChannel(userChannel);
        })
        .then(() => {
          setActiveChat(true);
        })
        .catch((error) => {
          console.error("Error creating channel:", error);
        });
    };

    if (userReady) {
      generateTokenAndConnect();
    }
  }, [userReady]);

  // Get user settings
  const { loading, error, data } = useQuery(QUERY_USER_SETTINGS, {
    variables: { userId: userProfile._id || userProfile.user._id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Get user's current theme
  const colorTheme = data.getUserSettings.currentTheme || "default-wf";

  // Set the color theme
  const setMode = (mode) => {
    const htmlElement = document.querySelector("html");
    htmlElement.className = "";
    htmlElement.classList.add(mode);

    // Store theme preference in localStorage
    localStorage.setItem("colorTheme", mode);
  };

  setMode(colorTheme);

  // Handle join button click
  const handleJoinButtonClick = () => {
    setUserReady(true);
  };

  return (
    <>
      {activeChat ? (
        !chatClient || !channel ? (
          <LoadingSpinner />
        ) : (
          <div className="box-container-wf">
            <div className="box-wf video-chat-player-box-wf">
              <Chat client={chatClient}>
                <Channel channel={channel}>
                  <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                  </Window>
                  <Thread />
                </Channel>
              </Chat>
            </div>
          </div>
        )
      ) : (
        <>
          {" "}
          <div className="box-container-wf">
            <div className="box-wf text-chat-input-box-wf">
              <h4>Workflow Text Chat</h4>
              <p>
                Please enter the name of the channel you'd like to join. If the
                channel does not exist, a new one will be created.
              </p>
              <input
                id="channel"
                type="text"
                className="input-wf text-chat-input-wf"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="Channel name"
              />
              <div className="text-chat-button-container-wf">
                <button
                  className="waves-effect waves-light btn button-wf"
                  onClick={() =>
                    channelName ? handleJoinButtonClick() : openModal()
                  }
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <PopUpModal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Error</h2>
        <p>Please enter a name for the channel you'd like to join.</p>
      </PopUpModal>
    </>
  );
};

export default TextChat;
