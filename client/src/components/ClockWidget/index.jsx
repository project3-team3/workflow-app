import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import PropTypes from "prop-types";

import { QUERY_USER_SETTINGS } from "../../utils/queries.js";
import { UPDATE_CLOCK_SETTINGS } from "../../utils/mutations.js";
import AuthService from "../../utils/auth.js";

const ClockWidget = () => {
  const userProfile = AuthService.getProfile();

  const [updateClockSettings] = useMutation(UPDATE_CLOCK_SETTINGS);
  const { loading, error, data } = useQuery(QUERY_USER_SETTINGS, {
    variables: { userId: userProfile?._id || userProfile?.user?._id },
  });

  const userSettings = data?.getUserSettings;

  if (!userSettings) {
    // Handle the case where userSettings is undefined or null
    console.error("User settings not found in query result.");
    return <p>Error loading user settings. Please try again later.</p>;
  }

  const [dateTime, setDateTime] = useState(new Date());
  const [isAnalog, setIsAnalog] = useState(userSettings.isAnalog);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = dateTime.getHours() % 12 || 12; // Get hours and convert 0 to 12
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();

  const formattedTime = `${hours}:${minutes.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  })}:${seconds.toLocaleString("en-US", { minimumIntegerDigits: 2 })}`;

  const formattedDate = dateTime.toLocaleDateString();
  const dayOfWeek = dateTime.toLocaleDateString(undefined, { weekday: "long" });

  const handleToggleClock = () => {
    const userId = userProfile._id || userProfile.user._id;

    // Toggle isAnalog in the local state immediately
    setIsAnalog((prevIsAnalog) => {
      const newIsAnalog = !prevIsAnalog;
      return newIsAnalog;
    });

    // Call the updateClockSettings mutation with the updated value of isAnalog
    updateClockSettings({
      variables: { userId, isAnalog: !isAnalog },
    })
      .then((result) => {
        console.log("Mutation result:", result);
      })
      .catch((error) => {
        console.error("Mutation error:", error);
      });
  };

  return (
    <div className="clock-widget widget-content-wf">
      {isAnalog ? (
        <div className="clock-container-wf">
          <AnalogClock dateTime={dateTime} />
        </div>
      ) : (
        <div className="clock-container-wf">
          <p className="clock-time">{formattedTime}</p>
          <p className="clock-date">
            {dayOfWeek}, {formattedDate}
          </p>
        </div>
      )}
      <button
        onClick={handleToggleClock}
        className="waves-effect waves-light btn button-wf button-wf widget-prevent-drag-wf"
      >
        {isAnalog ? "Digital" : "Analog"}
      </button>
    </div>
  );
};

ClockWidget.propTypes = {
  dateTime: PropTypes.instanceOf(Date),
};

const AnalogClock = ({ dateTime }) => {
  const [hourRotation, setHourRotation] = useState(0);
  const [minuteRotation, setMinuteRotation] = useState(0);
  const [secondRotation, setSecondRotation] = useState(0);

  useEffect(() => {
    const hours = dateTime.getHours() % 12;
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();

    const hourAngle = hours * 30 + minutes * 0.5;
    const minuteAngle = minutes * 6;
    const secondAngle = seconds * 6;

    setHourRotation(hourAngle);
    setMinuteRotation(minuteAngle);
    setSecondRotation(secondAngle);
  }, [dateTime]);

  const numbers = [];
  for (let i = 1; i <= 12; i++) {
    const angle = ((i * 30 - 90) * Math.PI) / 180;
    const x = 80 * Math.cos(angle);
    const y = 80 * Math.sin(angle);
    numbers.push(
      <text
        key={i}
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        className="clock-number"
      >
        {i}
      </text>
    );
  }

  const hourHandRotation = `rotate(${hourRotation})`;
  const minuteHandRotation = `rotate(${minuteRotation})`;

  return (
    <svg width="200" height="200" viewBox="-100 -100 200 200">
      {/* Clock face or the circle */}
      <circle cx="0" cy="0" r="90" className="clock-face" />

      {/* numbers for hours */}
      {numbers}

      {/* Hour clock hand */}
      <line
        x1="0"
        y1="0"
        x2="0"
        y2="-40"
        transform={hourHandRotation}
        stroke="black"
        strokeWidth="6"
      />

      {/* Minute clock hand */}
      <line
        x1="0"
        y1="0"
        x2="0"
        y2="-60"
        transform={minuteHandRotation}
        stroke="black"
        strokeWidth="4"
      />

      {/* Second clock hand */}
      <line
        x1="0"
        y1="0"
        x2="0"
        y2="-70"
        transform={`rotate(${secondRotation})`}
        stroke="red"
        strokeWidth="2"
      />

      {/* Center circle*/}
      <circle cx="0" cy="0" r="3" fill="black" />
    </svg>
  );
};

AnalogClock.propTypes = {
  dateTime: PropTypes.instanceOf(Date).isRequired,
};

export default ClockWidget;
