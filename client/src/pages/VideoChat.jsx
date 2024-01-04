// Video Chat page
// Credit: https://docs.agora.io/en/video-calling/get-started/get-started-uikit?platform=web#display-the-user-interface

import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import AgoraUIKit from "agora-react-uikit";

import AuthService from "../utils/auth.js";
import { useQuery } from "@apollo/client";
import { QUERY_USER_SETTINGS } from "../utils/queries.js";
import { GENERATE_AGORA_TOKEN } from "../utils/mutations.js";

import LoadingSpinner from "../components/LoadingSpinner/index.jsx";
import PopUpModal from "../components/PopUpModal/index.jsx";

const VideoChat = () => {
  // Check if the user is online
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Update online status when it changes
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Add event listeners for online/offline status
    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      // Remove event listeners when the component unmounts
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  // Get user profile
  const userProfile = AuthService.getProfile();

  const [videoCall, setVideoCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [showOverlaySpinner, setShowOverlaySpinner] = useState(false);

  const [generateAgoraToken] = useMutation(GENERATE_AGORA_TOKEN);

  const [generatedToken, setGeneratedToken] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleJoinButtonClick = async () => {
    try {
      setShowOverlaySpinner(true);

      // Request Agora token
      // NOTE: "userUid" is set to 0 because Agora requires a unique int 10-digit UID; However, GraphQL is unable to work with numbers that large.
      // Setting it to 0 prompts Agora to create a unique ID for the user for this session.
      const { data } = await generateAgoraToken({
        variables: { userChannelName: channelName, userUid: 0 },
      });

      // Extract the token from the response
      const token = data.generateAgoraToken.token;

      setGeneratedToken(token);
      setVideoCall(true);
    } catch (error) {
      console.error("Error generating Agora token:", error.message);
    }
  };

  // Agora video call props
  const rtcProps = {
    appId: "63ecd10aa2a1486dabd780bcabc0a943", // App ID is not secret
    channel: channelName, // User's chosen channel name
    token: generatedToken, // Token generated from Agora.io
  };

  // Agora video call callbacks
  const callbacks = {
    EndCall: () => {
      setVideoCall(false);
    },
  };

  useEffect(() => {
    // Set 3s timeout for overlay spinner to disappear
    if (showOverlaySpinner) {
      const timeoutId = setTimeout(() => {
        setShowOverlaySpinner(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [showOverlaySpinner]);

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

  return isOnline ? (
    <div>
      {videoCall ? (
        <div className="box-container-wf">
          <div className="box-wf video-chat-player-box-wf">
            <h4 className="video-channel-title-wf">
              Streaming Channel: {channelName}
            </h4>
            <div className={showOverlaySpinner ? "" : "hidden-wf"}>
              <div id="video-chat-overlay-spinner-wf">
                <LoadingSpinner />
              </div>
            </div>
            <div className={showOverlaySpinner ? "hidden-wf" : ""}>
              <div className="video-main-wf">
                <div className="video-outer-container-wf">
                  <div className="video-container-wf">
                    <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="box-container-wf">
          <div className="box-wf video-chat-input-box-wf">
            <h4>Workflow Video Chat</h4>

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
                  channelName ? handleJoinButtonClick() : openModal()
                }
              >
                Join
              </button>
            </div>
          </div>
        </div>
      )}
      <PopUpModal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Error</h2>
        <p>Please enter a name for the channel you'd like to join.</p>
      </PopUpModal>
    </div>
  ) : (
    <div className="box-container-wf">
      <div className="box-wf video-chat-input-box-wf">
        <h4>Workflow Video Chat</h4>
        <div className="chat-offline-message-wf">
          <p>You're offline. Please reconnect to use the video chat feature.</p>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;
