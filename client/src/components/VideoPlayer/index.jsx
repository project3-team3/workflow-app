// Credit: https://www.agora.io/en/blog/agora-react-sdk-build-a-video-conferencing-app-in-minutes/

import {
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
  RemoteUser,
  LocalVideoTrack,
} from "agora-rtc-react";

const VideoPlayer = (props) => {
  console.log("Loading VideoPlayer...");
  console.log("VideoPlayer props:", props);

  const AppID = "63ecd10aa2a1486dabd780bcabc0a943"; // Not secret
  const token =
    "007eJxTYKh1mC9a6rn3waagM+JPLXObTH8JPjmfsMd4ey/HocvdN64oMJgZpyanGBokJholGppYmKUkJqWYWxgkJScmJRskWpoYM87sSW0IZGSIu6DEwsgAgSA+C0NJanEJAwMAwYYhCg=="; // Temporary token for testing
  const { channelName, localUsername } = props;
  console.log("AppID:", AppID);
  console.log("channelName:", channelName);
  console.log("token:", token);
  console.log("localUsername:", localUsername);
  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack();
  console.log("isLoadingMic:", isLoadingMic);
  console.log("localMicrophoneTrack:", localMicrophoneTrack);
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  console.log("isLoadingCam:", isLoadingCam);
  console.log("localCameraTrack:", localCameraTrack);
  const remoteUsers = useRemoteUsers();
  console.log("remoteUsers:", remoteUsers);
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);
  console.log("audioTracks:", audioTracks);

  console.log("Publishing local tracks...");
  usePublish([localMicrophoneTrack, localCameraTrack]);
  console.log("Local tracks published?");

  console.log("Joining channel...");
  useJoin({
    appid: AppID,
    channel: channelName,
    token: token,
  });
  console.log("Channel joined?");

  console.log("Playing remote audio tracks...");
  audioTracks.map((track) => track.play());
  console.log("Remote audio tracks playing?");

  const deviceLoading = isLoadingMic || isLoadingCam;
  if (deviceLoading) return <div>Loading devices...</div>;

  return (
    <div className="video-main-wf">
      <div className="video-outer-container-wf">
        <div className="video-container-wf">
          <LocalVideoTrack
            className="video-player-wf"
            track={localCameraTrack}
            play={true}
          />
        </div>
        <p>{localUsername}</p>
      </div>
      <div className="arrow-container-wf">
        <i className="medium material-icons arrow-wf">arrow_forward</i>
        <i className="medium material-icons arrow-wf">arrow_back</i>
      </div>
      <div className="video-outer-container-wf">
        <div className="video-container-wf">
          {remoteUsers.map((user) => (
            <RemoteUser className="video-player-wf" user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
