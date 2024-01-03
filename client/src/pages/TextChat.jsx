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

import "stream-chat-react/dist/css/v2/index.css";

const TextChat = () => {
  console.log("[TextChat.jsx]: *** NEW RENDER ***");

  // Get user profile
  const userProfile = AuthService.getProfile();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [channelName, setChannelName] = useState("");
  const [userReady, setUserReady] = useState(false);
  const [activeChat, setActiveChat] = useState(false);
  const [generateStreamToken] = useMutation(GENERATE_STREAM_TOKEN);

  // TODO: Add state variable for user input box

  const userId = userProfile.username || userProfile.user.username;
  const username = userProfile.username || userProfile.user.username;
  const user = {
    id: userId,
    name: username,
    image: `https://getstream.io/random_png/?id=${userId}&name=${username}`,
  };

  console.log("[TextChat.jsx]: user:", user);

  const apiKey = "dz5f4d5kzrue"; // API Key not secret

  useEffect(() => {
    const generateTokenAndConnect = async () => {
      console.log(
        "[TextChat.jsx]: About to run generateStreamToken mutation..."
      );
      const tokenPromise = generateStreamToken({
        variables: { username: userId },
      });

      tokenPromise
        .then((data) => {
          console.log("[TextChat.jsx]: data:", data);
          const userToken = data.data.generateStreamToken;
          console.log("[TextChat.jsx]: userToken:", userToken);
          return userToken;
        })
        .then((userToken) => {
          const client = new StreamChat(apiKey);
          client.connectUser(user, userToken);
          console.log("[TextChat.jsx]: Connected to Chat?");
          return client;
        })
        .then((client) => {
          const userChannel = client.channel(
            "messaging",
            `workflow-wf-${channelName}`,
            {
              name: channelName,
              members: [userId],
            }
          );
          setChatClient(client);
          console.log("[TextChat.jsx]: userChannel:", userChannel);
          return userChannel;
        })
        .then((userChannel) => {
          setChannel(userChannel);
          console.log("[TextChat.jsx]: userChannel:", userChannel);
        })
        .then(() => {
          setActiveChat(true);
        })
        .catch((error) => {
          console.error("[TextChat.jsx]: Error:", error);
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

  const handleJoinButtonClick = () => {
    setUserReady(true);
  };

  // TODO: Add input box in the same model as Video Chat, ask for channel name
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
    </>
  );
};

export default TextChat;
