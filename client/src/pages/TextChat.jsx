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

import "stream-chat-react/dist/css/v2/index.css";

const TextChat = () => {
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
