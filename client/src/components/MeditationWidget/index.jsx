import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";

const MeditationWidget = () => {
  const trackList = [
    { label: "Meditation (5 minutes)", value: "/med_track_1.ogg" },
    { label: "Meditation (10 minutes)", value: "/med_track_2.ogg" },
    { label: "Meditation (15 minutes)", value: "/med_track_3.ogg" },
    { label: "Meditation (20 minutes)", value: "/med_track_4.ogg" },
    { label: "Meditation (25 minutes)", value: "/med_track_5.ogg" },
  ];

  const [currentTrack, setCurrentTrack] = useState(trackList[0].value);

  const handleTrackChange = (event) => {
    setCurrentTrack(event.target.value);
  };

  return (
    <div className="meditation-widget widget-content-wf">
      <h5>Meditation</h5>
      <ReactAudioPlayer
        src={currentTrack}
        className="meditation-audio-player"
        controls
      />
      <div className="input-field meditation-dropdown">
        <select
          className="browser-default meditation-dropdown-align-wf"
          value={currentTrack}
          onChange={handleTrackChange}
        >
          {trackList.map((track) => (
            <option key={track.value} value={track.value}>
              {track.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MeditationWidget;
