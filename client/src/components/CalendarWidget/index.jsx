import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../../styles/widget.css";

const CalendarWidget = () => {
  const [date, setDate] = useState(new Date());

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