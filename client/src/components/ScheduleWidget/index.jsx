import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { FaTrash, FaCheck, FaUndo } from "react-icons/fa";

import { QUERY_USER_SETTINGS } from "../../utils/queries.js";
import { UPDATE_SCHEDULE_SETTINGS } from "../../utils/mutations.js";
import AuthService from "../../utils/auth.js";

const ScheduleWidget = () => {
  const userProfile = AuthService.getProfile();

  const [updateScheduleSettings] = useMutation(UPDATE_SCHEDULE_SETTINGS);
  const { loading, error, data } = useQuery(QUERY_USER_SETTINGS, {
    variables: { userId: userProfile?._id || userProfile?.user?._id },
  });

  const userSettings = data?.getUserSettings;

  if (!userSettings) {
    // Handle the case where userSettings is undefined or null
    console.error("User settings not found in query result.");
    return <p>Error loading user settings. Please try again later.</p>;
  }

  console.log("userSettings:", userSettings);

  let scheduleWithoutTypename;

  if (userSettings.scheduleEvents.length === 0) {
    scheduleWithoutTypename = [];
  } else {
    const { __typename: mainTypename, ...scheduleData } =
      userSettings.scheduleEvents[0];
    scheduleWithoutTypename = [scheduleData];
  }

  console.log(
    "scheduleWithoutTypename:",
    scheduleWithoutTypename,
    typeof scheduleWithoutTypename
  );

  const [events, setEvents] = useState(scheduleWithoutTypename);

  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDay, setNewEventDay] = useState("");
  const [newEventMonth, setNewEventMonth] = useState("");
  const [newEventYear, setNewEventYear] = useState("");
  const [newEventTime, setNewEventTime] = useState("");

  useEffect(() => {
    console.log("Events variable changed (useEffect triggered):", events);
    updateScheduleSettings({
      variables: {
        userId: userProfile._id || userProfile.user._id,
        scheduleEvents: JSON.stringify(events),
      },
    }).then((res) => {
      console.log("Schedule settings updated:", res);
    });
  }, [events]);

  useEffect(() => {
    var elems = document.querySelectorAll(".datepicker");
    var instances = M.Datepicker.init(elems);
    console.log("Event listeners added to datepicker elements.");
  }, []);

  const addEvent = () => {
    if (
      newEventTitle &&
      newEventDay &&
      newEventDay !== "Day" &&
      newEventMonth &&
      newEventMonth !== "Month" &&
      newEventYear &&
      newEventYear !== "Year" &&
      newEventTime &&
      newEventTime !== "Time"
    ) {
      const newEventDate = `${newEventMonth}-${newEventDay}-${newEventYear}`;
      const newEvent = {
        id: (events.length + 1).toString(),
        title: newEventTitle,
        date: newEventDate,
        time: newEventTime,
        completed: false,
      };
      const updatedEvents = events.concat(newEvent);
      setEvents(updatedEvents);
      setNewEventTitle("");
      setNewEventDay("");
      setNewEventMonth("");
      setNewEventYear("");
      setNewEventTime("");
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
          <div
            key={event.id}
            className={`event ${event.completed ? "completed" : ""}`}
          >
            <p>
              {event.title} ({event.date} - {event.time})
            </p>
            <div className="event-icons">
              <FaTrash
                onClick={() => deleteEvent(event.id)}
                className="icon schedule-icon-wf widget-prevent-drag-wf"
              />
              {event.completed ? (
                <FaUndo
                  onClick={() => toggleComplete(event.id)}
                  className="icon schedule-icon-wf widget-prevent-drag-wf"
                />
              ) : (
                <FaCheck
                  onClick={() => toggleComplete(event.id)}
                  className="icon schedule-icon-wf widget-prevent-drag-wf"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="new-event">
        <h6>Add New Event</h6>
        <input
          type="text"
          placeholder="Event description"
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
          className="input-wf schedule-input-wf widget-prevent-drag-wf"
        />
        <div className="input-field schedule-dropdown-container-wf">
          <select
            className="browser-default schedule-dropdown-wf widget-prevent-drag-wf"
            placeholder="Day"
            value={newEventDay}
            onChange={(e) => setNewEventDay(e.target.value)}
          >
            <option selected className="schedule-dropdown-disabled-wf">
              Day
            </option>
            {Array.from(Array(31).keys()).map((day) => (
              <option value={day + 1}>{day + 1}</option>
            ))}
          </select>
          <select
            className="browser-default schedule-dropdown-wf widget-prevent-drag-wf"
            placeholder="Month"
            value={newEventMonth}
            onChange={(e) => setNewEventMonth(e.target.value)}
          >
            <option selected className="schedule-dropdown-disabled-wf">
              Month
            </option>
            {Array.from(Array(12).keys()).map((month) => (
              <option value={month + 1}>{month + 1}</option>
            ))}
          </select>
          <select
            className="browser-default schedule-dropdown-wf widget-prevent-drag-wf"
            placeholder="Year"
            value={newEventYear}
            onChange={(e) => setNewEventYear(e.target.value)}
          >
            <option selected className="schedule-dropdown-disabled-wf">
              Year
            </option>
            {Array.from(Array(20).keys()).map((year) => (
              <option value={year + 2024}>{year + 2024}</option>
            ))}
          </select>
        </div>
        <select
          className="browser-default schedule-dropdown-wf widget-prevent-drag-wf"
          placeholder="Time"
          value={newEventTime}
          onChange={(e) => setNewEventTime(e.target.value)}
        >
          <option selected className="schedule-dropdown-disabled-wf">
            Time
          </option>
          {Array.from(Array(48).keys()).map((index) => {
            const hour = Math.floor(index / 2);
            const minutes = index % 2 === 0 ? "00" : "30";
            const time = `${hour}:${minutes}`;
            return <option value={time}>{time}</option>;
          })}
        </select>
        <button
          onClick={addEvent}
          className="waves-effect waves-light btn button-wf widget-prevent-drag-wf"
        >
          ADD EVENT
        </button>
      </div>
    </div>
  );
};

export default ScheduleWidget;
