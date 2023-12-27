// Credit: https://www.agora.io/en/blog/agora-react-sdk-build-a-video-conferencing-app-in-minutes/

import { useState } from "react";
import { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-sdk-ng";

import VideoPlayer from "../components/VideoPlayer/index.jsx";
import VideoPlayerForm from "../components/VideoPlayerForm/index.jsx";

import AuthService from "../utils/auth.js";
import { useQuery } from "@apollo/client";
import { QUERY_USER_SETTINGS } from "../utils/queries.js";

const VideoChat = () => {
  const userProfile = AuthService.getProfile();
  console.log("userProfile:", userProfile);
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );
  console.log("client:", client);
  const [channelName, setChannelName] = useState();
  console.log("channelName:", channelName);
  const [inCall, setInCall] = useState(false);
  console.log("inCall:", inCall);
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
  };

  setMode(colorTheme);

  return (
    <div>
      <h2 className="video-chat-title-wf">Workflow Video Chat</h2>
      {!inCall ? (
        <VideoPlayerForm
          channelName={channelName}
          setChannelName={setChannelName}
          setInCall={setInCall}
        />
      ) : (
        <AgoraRTCProvider client={client}>
          <VideoPlayer channelName={channelName} localUsername={userProfile.user.username} />
          <div className="video-player-button-container-wf">
            <button
              className="waves-effect waves-light btn button-wf video-player-button-wf"
              onClick={() => setInCall(false)}
            >
              End Call
            </button>
          </div>
        </AgoraRTCProvider>
      )}
    </div>
  );
};

export default VideoChat;
