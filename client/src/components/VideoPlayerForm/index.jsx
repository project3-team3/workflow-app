// Credit: https://www.agora.io/en/blog/agora-react-sdk-build-a-video-conferencing-app-in-minutes/

const VideoPlayerForm = (props) => {
  const { channelName, setChannelName, setInCall } = props;

  return (
    <div className="video-player-form-wf">
      <p>
        Please enter the name of the channel you'd like to join. If the channel
        does not exist, a new one will be created.
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
            channelName ? setInCall(true) : alert("Please enter Channel Name")
          }
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default VideoPlayerForm;
