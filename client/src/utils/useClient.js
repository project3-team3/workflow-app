import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';

export const useClient = ({
  apiKey,
  user,
  tokenOrProvider,
}) => {
  const [chatClient, setChatClient] = useState();
  useEffect(() => {
    const client = new StreamChat(apiKey);
    let didUserConnectInterrupt = false;
    const connectionPromise = client.connectUser(user, tokenOrProvider).then(() => {
      if (!didUserConnectInterrupt) {
        setChatClient(client);
      }
    });
    return () => {
      didUserConnectInterrupt = true;
      setChatClient();
      connectionPromise
        .then(() => client.disconnectUser())
        .then(() => {
          console.log('connection closed');
        });
    };
  }, [apiKey, user.id, tokenOrProvider]);
  return chatClient;
};