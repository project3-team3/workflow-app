import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/widget.css';

const ClockWidget = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [isAnalog, setIsAnalog] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = dateTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const formattedDate = dateTime.toLocaleDateString();
  const dayOfWeek = dateTime.toLocaleDateString(undefined, { weekday: 'long' });

  const handleToggleClock = () => {
    setIsAnalog(!isAnalog);
  };

  return (
    <div className="clock-widget">
      <h3>Clock</h3>
      {isAnalog ? (
        <AnalogClock dateTime={dateTime} />
      ) : (
        <>
          <p className="clock-time">{formattedTime}</p>
          <p className="clock-date">{formattedDate}</p>
          <p className="clock-day">{dayOfWeek}</p>
        </>
      )}
      <button onClick={handleToggleClock}>
        {isAnalog ? 'Switch to Digital Clock' : 'Switch to Analog Clock'}
      </button>
    </div>
  );
};

ClockWidget.propTypes = {
  dateTime: PropTypes.instanceOf(Date).isRequired,
};

const AnalogClock = ({ dateTime }) => {
  const [hourRotation, setHourRotation] = useState(0);
  const [minuteRotation, setMinuteRotation] = useState(0);
  const [secondRotation, setSecondRotation] = useState(0);

  useEffect(() => {
    const hours = dateTime.getHours() % 12;
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();

    const hourAngle = (hours * 30) + (minutes * 0.5);
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
      <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="central" className="clock-number">
        {i}
      </text>
    );
  }

  const hourHandRotation = `rotate(${hourRotation})`;
  const minuteHandRotation = `rotate(${minuteRotation})`;

  return (
    <svg
      width="200"
      height="200"
      viewBox="-100 -100 200 200"
      style={{ backgroundColor: 'white', border: '1px solid black' }}
    >
      {/* Clock face or the circle */}
      <circle cx="0" cy="0" r="90" className="clock-face" />

      {/* numbers for hours */}
      {numbers}

      {/* Hour clock hand */}
      <line x1="0" y1="0" x2="0" y2="-40" transform={hourHandRotation} stroke="black" strokeWidth="6" />

      {/* Minute clock hand */}
      <line x1="0" y1="0" x2="0" y2="-60" transform={minuteHandRotation} stroke="black" strokeWidth="4" />

      {/* Second clock hand */}
      <line x1="0" y1="0" x2="0" y2="-70" transform={`rotate(${secondRotation})`} stroke="red" strokeWidth="2" />

      {/* Center circle*/}
      <circle cx="0" cy="0" r="3" fill="black" />
    </svg>
  );
};

AnalogClock.propTypes = {
  dateTime: PropTypes.instanceOf(Date).isRequired,
};

export default ClockWidget;