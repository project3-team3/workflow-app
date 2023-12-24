import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

const CalendarWidget = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // Find and select the elements with class react-calendar__navigation and react-calendar__month-view__weekdays
    const navigationEl = document.querySelector(".react-calendar__navigation");
    const daysEl = document.querySelector(
      ".react-calendar__month-view__days"
    );
    // Add the class widget-prevent-drag-wf to the elements
    navigationEl.classList.add("widget-prevent-drag-wf");
    daysEl.classList.add("widget-prevent-drag-wf");
  }, []);

  return (
    <div className="calendar-widget widget-content-wf">
      <Calendar
        className="custom-calendar"
        onChange={setDate}
        value={date}
      />
    </div>
  );
};

export default CalendarWidget;