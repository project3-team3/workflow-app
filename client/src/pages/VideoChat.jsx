// Credit: https://docs.agora.io/en/video-calling/get-started/get-started-uikit?platform=web#display-the-user-interface

import { useState } from "react";
import AgoraUIKit from "agora-react-uikit";

import AuthService from "../utils/auth.js";
import { useQuery } from "@apollo/client";
import { QUERY_USER_SETTINGS } from "../utils/queries.js";

const VideoChat = () => {
  const userProfile = AuthService.getProfile();
  const [videoCall, setVideoCall] = useState(false);
  const [channelName, setChannelName] = useState("");

  const rtcProps = {
    appId: "10ad7a8f7b844ecc940092cd18c07f47",
    channel: channelName,
    token: null,
  };

  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

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