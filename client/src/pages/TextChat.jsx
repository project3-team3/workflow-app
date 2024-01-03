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
import { useQuery } from "@apollo/client";
import { QUERY_USER_SETTINGS } from "../utils/queries.js";

import "stream-chat-react/dist/css/v2/index.css";

const TextChat = () => {
  // Get user profile
  const userProfile = AuthService.getProfile();

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

  const userId = "billowing-dream-4";
  const userName = "billowing";
  const user = {
    id: userId,
    name: userName,
    image: `https://getstream.io/random_png/?id=${userId}&name=${userName}`,
  };

  const apiKey = "dz5f4d5kzrue";
  const userToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmlsbG93aW5nLWRyZWFtLTQiLCJleHAiOjE3MDQyNjY5Mjd9.pQhdC2PyaxM9HrbYjxmgeH8RlxIV42t6wQbOpKbjIUI";

  const chatClient = new StreamChat(apiKey);
  chatClient.connectUser(user, userToken);

  const channel = chatClient.channel("messaging", "custom_channel_id", {
    image: "https://www.drupal.org/files/project-images/react.png",
    name: "Talk about React",
    members: [userId],
  });

  return (
    <Chat client={chatClient} theme="str-chat__theme-light">
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default TextChat;
