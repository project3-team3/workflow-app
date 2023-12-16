import { useState } from 'react';
import "../../styles/widget.css";
import { FaTrash, FaCheck, FaUndo } from 'react-icons/fa';

//Temporary placeholder for the schedule. Once the database are all set, then delete this code."
const ScheduleWidget = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Meeting 1', time: '10:00 AM', completed: false },
    { id: 2, title: 'Appointment 1', time: '02:30 PM', completed: false },
  ]);

  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('');

  const addEvent = () => {
    if (newEventTitle && newEventTime) {
      const newEvent = {
        id: Math.floor(Math.random() * 1000),
        title: newEventTitle,
        time: newEventTime,
        completed: false,
      };
      const updatedEvents = events.concat(newEvent);
      setEvents(updatedEvents);
      setNewEventTitle('');
      setNewEventTime('');
    }
  };
  

  const deleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

  const toggleComplete = (id) => {
    const updatedEvents = events.map((event) => {
      if (event.id === id) {
        return Object.assign({}, event, { completed: !event.completed });
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  return (
    <div className="schedule-widget widget-content-wf">
      <h4>Daily Schedule</h4>
      <div className="event-list">
        {events.map((event) => (
          <div key={event.id} className={`event ${event.completed ? 'completed' : ''}`}>
            <p>{event.title} - {event.time}</p>
            <div className="event-icons">
              <FaTrash onClick={() => deleteEvent(event.id)} className="icon schedule-icon-wf widget-prevent-drag-wf" />
              {event.completed ? (
                <FaUndo onClick={() => toggleComplete(event.id)} className="icon schedule-icon-wf widget-prevent-drag-wf" />
              ) : (
                <FaCheck onClick={() => toggleComplete(event.id)} className="icon schedule-icon-wf widget-prevent-drag-wf" />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="new-event">
        <h6>Add New Event</h6>
        <input
          type="text"
          placeholder="Event Title"
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
          className='widget-prevent-drag-wf'
        />
        <input
          type="text"
          placeholder="Event Time"
          value={newEventTime}
          onChange={(e) => setNewEventTime(e.target.value)}
          className='widget-prevent-drag-wf'
        />
        <button onClick={addEvent} className='widget-prevent-drag-wf'>ADD EVENT</button>
      </div>
    </div>
  );
};

export default ScheduleWidget;
