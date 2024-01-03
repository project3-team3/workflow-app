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
import { QUERY_USER_SETTINGS } from "../utils/queries.js";
import { GENERATE_STREAM_TOKEN } from "../utils/mutations.js";

import "stream-chat-react/dist/css/v2/index.css";

const TextChat = () => {
  console.log("[TextChat.jsx]: *** NEW RENDER ***");

  // Get user profile
  const userProfile = AuthService.getProfile();

  const [generateStreamToken] = useMutation(GENERATE_STREAM_TOKEN);

  // TODO: Add state variable for user input box

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

  const userId = userProfile.username || userProfile.user.username;
  const username = userProfile.username || userProfile.user.username;
  const user = {
    id: userId,
    name: username,
    image: `https://getstream.io/random_png/?id=${userId}&name=${username}`,
  };

  console.log("[TextChat.jsx]: user:", user);

  const apiKey = "dz5f4d5kzrue"; // API Key not secret
  // const userToken = "fictional-user-token"; // TODO: Remove this after testing and uncomment below

  const userToken = generateStreamToken(userId);
  console.log("[TextChat.jsx]: userToken:", userToken);

  const chatClient = new StreamChat(apiKey);
  chatClient.connectUser(user, userToken);
  console.log("[TextChat.jsx]: Connected to Chat?");

  // TODO: Replace "workflow_test" with user input
  const channel = chatClient.channel("messaging", "workflow_test", {
    image: "https://www.drupal.org/files/project-images/react.png",
    name: "Workflow ROCKING channel",
    members: [userId],
  });

  // TODO: Add input box in the same model as Video Chat, ask for channel name
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
