import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

import CalendarWidget from '../CalendarWidget/index.jsx';
import ClockWidget from '../ClockWidget/index.jsx';
import FileManagementWidget from '../FileManagementWidget/index.jsx';
import NotepadWidget from '../NotepadWidget/index.jsx';
import ScheduleWidget from '../ScheduleWidget/index.jsx';
import StickyNoteWidget from '../StickyNoteWidget/index.jsx';
import ToDoListWidget from '../ToDoListWidget/index.jsx';
import MeditationWidget from '../MeditationWidget/index.jsx';
import InspiringQuoteWidget from '../InspiringQuoteWidget/index.jsx';
import BalanceTipWidget from '../BalanceTipWidget/index.jsx';

const ResponsiveGridLayout = WidthProvider(Responsive);

function getResponsiveLayouts() {
    return {
      lg: [
        { i: "calendar", x: 1, y: 0, w: 1, h: 2, minH: 2, autosize: true },
        { i: "clock", x: 0, y: 0, w: 1, h: 2, minH: 2, autosize: true },
        { i: "filemanagement", x: 1, y: 11, w: 1, h: 1, autosize: true },
        { i: "notepad", x: 0, y: 6, w: 2, h: 4, minH: 2, minW: 1, autosize: true },
        { i: "schedule", x: 2, y: 6, w: 2, h: 4, minH: 4, minW: 2, autosize: true },
        { i: "stickynote", x: 4, y: 3, w: 1, h: 2, minH: 2, autosize: true },
        { i: "todolist", x: 0, y: 3, w: 3, h: 3, minH: 3, minW: 3, autosize: true },
        { i: "meditation", x: 4, y: 5, w: 1, h: 1, autosize: true },
        { i: "inspiringquote", x: 0, y: 11, w: 1, h: 2, autosize: true },
        { i: "balancetip", x: 3, y: 0, w: 2, h: 2, autosize: true }
      ],
      md: [
        { i: "calendar", x: 1, y: 0, w: 1, h: 2, minH: 2, autosize: true },
        { i: "clock", x: 0, y: 0, w: 1, h: 2, minH: 2, autosize: true },
        { i: "filemanagement", x: 1, y: 11, w: 1, h: 1, autosize: true },
        { i: "notepad", x: 0, y: 6, w: 2, h: 4, minH: 2, minW: 1, autosize: true },
        { i: "schedule", x: 2, y: 6, w: 2, h: 4, minH: 4, minW: 2, autosize: true },
        { i: "stickynote", x: 4, y: 3, w: 1, h: 2, minH: 2, autosize: true },
        { i: "todolist", x: 0, y: 3, w: 3, h: 3, minH: 3, minW: 3, autosize: true },
        { i: "meditation", x: 4, y: 5, w: 1, h: 1, autosize: true },
        { i: "inspiringquote", x: 0, y: 11, w: 1, h: 2, autosize: true },
        { i: "balancetip", x: 3, y: 0, w: 2, h: 2, autosize: true }
      ],
      sm: [
        { i: "calendar", x: 1, y: 0, w: 1, h: 2, minH: 2, autosize: true },
        { i: "clock", x: 0, y: 0, w: 1, h: 2, minH: 2, autosize: true },
        { i: "filemanagement", x: 1, y: 5, w: 1, h: 1, autosize: true },
        { i: "notepad", x: 0, y: 16, w: 2, h: 4, minH: 2, minW: 1, autosize: true },
        { i: "schedule", x: 0, y: 6, w: 2, h: 4, minH: 4, minW: 2, autosize: true },
        { i: "stickynote", x: 1, y: 10, w: 1, h: 2, minH: 2, autosize: true },
        { i: "todolist", x: 0, y: 12, w: 2, h: 3, minH: 3, minW: 2, autosize: true },
        { i: "meditation", x: 0, y: 5, w: 1, h: 1, autosize: true },
        { i: "inspiringquote", x: 0, y: 10, w: 1, h: 2, autosize: true },
        { i: "balancetip", x: 0, y: 3, w: 2, h: 2, autosize: true }
      ],
      xs: [
        { i: "calendar", x: 0, y: 10, w: 1, h: 2, minH: 2, autosize: true },
        { i: "clock", x: 0, y: 0, w: 1, h: 2, minH: 2, autosize: true },
        { i: "filemanagement", x: 0, y: 13, w: 1, h: 1, autosize: true },
        { i: "notepad", x: 0, y: 20, w: 1, h: 4, minH: 2, autosize: true },
        { i: "schedule", x: 0, y: 3, w: 1, h: 4, minH: 4, autosize: true },
        { i: "stickynote", x: 0, y: 8, w: 1, h: 2, minH: 2, autosize: true },
        { i: "todolist", x: 0, y: 14, w: 1, h: 3, minH: 3, autosize: true },
        { i: "meditation", x: 0, y: 12, w: 1, h: 1, autosize: true },
        { i: "inspiringquote", x: 0, y: 7, w: 1, h: 1, autosize: true },
        { i: "balancetip", x: 0, y: 18, w: 1, h: 2, autosize: true }
      ]
    };
  }

class WidgetGrid extends React.Component {
    
  render() {
    const layouts = getResponsiveLayouts();
    return (
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 992, sm: 600, xs: 360 }}
        cols={{ lg: 4, md: 4, sm: 2, xs: 1 }}
      >
        <div key="calendar" className="widget-wf z-depth-4"><CalendarWidget /></div>
        <div key="clock" className="widget-wf z-depth-4"><ClockWidget /></div>
        <div key="filemanagement" className="widget-wf z-depth-4"><FileManagementWidget /></div>
        <div key="notepad" className="widget-wf z-depth-4"><NotepadWidget /></div>
        <div key="schedule" className="widget-wf z-depth-4"><ScheduleWidget /></div>
        <div key="stickynote" className="widget-wf z-depth-4"><StickyNoteWidget /></div>
        <div key="todolist" className="widget-wf z-depth-4"><ToDoListWidget /></div>
        <div key="meditation" className="widget-wf z-depth-4"><MeditationWidget /></div>
        <div key="inspiringquote" className="widget-wf z-depth-4"><InspiringQuoteWidget /></div>
        <div key="balancetip" className="widget-wf z-depth-4"><BalanceTipWidget /></div>
      </ResponsiveGridLayout>
    );
  }
}

export default WidgetGrid;