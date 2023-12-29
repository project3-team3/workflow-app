// Video Chat page
// Credit: https://docs.agora.io/en/video-calling/get-started/get-started-uikit?platform=web#display-the-user-interface

import { useState } from "react";
import AgoraUIKit from "agora-react-uikit";

import AuthService from "../utils/auth.js";
import { useQuery } from "@apollo/client";
import { QUERY_USER_SETTINGS } from "../utils/queries.js";

const VideoChat = () => {
  // Get user profile
  const userProfile = AuthService.getProfile();

  const [videoCall, setVideoCall] = useState(false);
  const [channelName, setChannelName] = useState("");

  // Agora video call props
  const rtcProps = {
    appId: "10ad7a8f7b844ecc940092cd18c07f47", // App ID not secret
    channel: channelName, // User's chosen channel name
    token: null,
  };

  // Agora video call callbacks
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

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

  return (
    <div>
      <h2 className="video-chat-title-wf">Workflow Video Chat</h2>
      {videoCall ? (
        <div className="video-main-wf">
          <div className="video-outer-container-wf">
            <div className="video-container-wf">
              <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
            </div>
          </div>
        </div>
      ) : (
        <div className="video-player-form-wf">
          <p>
            Please enter the name of the channel you'd like to join. If the
            channel does not exist, a new one will be created.
          </p>
          <input
            id="channel"
            type="text"
            className="input-wf video-player-input-wf"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Channel name"
          />
          <div className="video-player-button-container-wf">
            <button
              className="waves-effect waves-light btn button-wf video-player-button-wf"
              onClick={() =>
                channelName
                  ? setVideoCall(true)
                  : alert("Please enter Channel Name")
              }
            >
              Join
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoChat;
