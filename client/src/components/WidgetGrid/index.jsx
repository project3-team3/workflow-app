import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER_SETTINGS } from "../../utils/queries.js";
import { UPDATE_GRID_SETTINGS } from "../../utils/mutations.js";
import AuthService from "../../utils/auth.js";

import CalendarWidget from "../CalendarWidget/index.jsx";
import ClockWidget from "../ClockWidget/index.jsx";
import FileManagementWidget from "../FileManagementWidget/index.jsx";
import NotepadWidget from "../NotepadWidget/index.jsx";
import ScheduleWidget from "../ScheduleWidget/index.jsx";
import StickyNoteWidget from "../StickyNoteWidget/index.jsx";
import ToDoListWidget from "../ToDoListWidget/index.jsx";
import MeditationWidget from "../MeditationWidget/index.jsx";
import InspiringQuoteWidget from "../InspiringQuoteWidget/index.jsx";
import BalanceTipWidget from "../BalanceTipWidget/index.jsx";

const ResponsiveGridLayout = WidthProvider(Responsive);

export const defaultLayout = {
  lg: [
    { i: "calendar", x: 1, y: 0, w: 1, h: 2, minH: 2, minW: 1, autosize: true },
    { i: "clock", x: 0, y: 0, w: 1, h: 2, minH: 2, minW: 1, autosize: true },
    {
      i: "filemanagement",
      x: 1,
      y: 11,
      w: 1,
      h: 1,
      minH: 1,
      minW: 1,
      autosize: true,
    },
    { i: "notepad", x: 0, y: 6, w: 2, h: 4, minH: 2, minW: 1, autosize: true },
    { i: "schedule", x: 2, y: 6, w: 2, h: 4, minH: 4, minW: 2, autosize: true },
    {
      i: "stickynote",
      x: 4,
      y: 3,
      w: 1,
      h: 2,
      minH: 2,
      minW: 1,
      autosize: true,
    },
    { i: "todolist", x: 0, y: 3, w: 3, h: 3, minH: 3, minW: 3, autosize: true },
    {
      i: "meditation",
      x: 4,
      y: 5,
      w: 1,
      h: 1,
      minH: 1,
      minW: 1,
      autosize: true,
    },
    {
      i: "inspiringquote",
      x: 0,
      y: 11,
      w: 1,
      h: 2,
      minH: 1,
      minW: 1,
      autosize: true,
    },
    {
      i: "balancetip",
      x: 3,
      y: 0,
      w: 2,
      h: 2,
      minH: 1,
      minW: 1,
      autosize: true,
    },
  ],
  md: [
    { i: "calendar", x: 1, y: 0, w: 1, h: 2, minH: 2, minW: 1, autosize: true },
    { i: "clock", x: 0, y: 0, w: 1, h: 2, minH: 2, minW: 1, autosize: true },
    {
      i: "filemanagement",
      x: 1,
      y: 11,
      w: 1,
      h: 1,
      minH: 1,
      minW: 1,
      autosize: true,
    },
    { i: "notepad", x: 0, y: 6, w: 2, h: 4, minH: 2, minW: 1, autosize: true },
    { i: "schedule", x: 2, y: 6, w: 2, h: 4, minH: 4, minW: 2, autosize: true },
    {
      i: "stickynote",
      x: 4,
      y: 3,
      w: 1,
      h: 2,
      minH: 2,
      minW: 1,
      autosize: true,
    },
    { i: "todolist", x: 0, y: 3, w: 3, h: 3, minH: 3, minW: 3, autosize: true },
    {
      i: "meditation",
      x: 4,
      y: 5,
      w: 1,
      h: 1,
      minH: 1,
      minW: 1,
      autosize: true,
    },
    {
      i: "inspiringquote",
      x: 0,
      y: 11,
      w: 1,
      h: 2,
      minH: 1,
      minW: 1,
      autosize: true,
    },
    {
      i: "balancetip",
      x: 3,
      y: 0,
      w: 2,
      h: 2,
      minH: 1,
      minW: 1,
      autosize: true,
    },
  ],
  sm: [
    { i: "calendar", x: 1, y: 0, w: 1, h: 2, minH: 2, minW: 1, autosize: true },
    { i: "clock", x: 0, y: 0, w: 1, h: 2, minH: 2, minW: 1, autosize: true },
    {
      i: "filemanagement",
      x: 1,
      y: 5,
      w: 1,
      h: 1,
      minH: 1,
      minW: 1,
      autosize: true,
    },
    { i: "notepad", x: 0, y: 16, w: 2, h: 4, minH: 2, minW: 1, autosize: true },
    { i: "schedule", x: 0, y: 6, w: 2, h: 4, minH: 4, minW: 2, autosize: true },
    {
      i: "stickynote",
      x: 1,
      y: 10,
      w: 1,
      h: 2,
      minH: 2,
      minW: 1,
      autosize: true,
    },
    {
      i: "todolist",
      x: 0,
      y: 12,
      w: 2,
      h: 3,
      minH: 3,
      minW: 2,
      autosize: true,
    },
    {
      i: "meditation",
      x: 0,
      y: 5,
      w: 1,
      h: 1,
      minH: 1,
      minW: 1,
      autosize: true,
    },
    {
      i: "inspiringquote",
      x: 0,
      y: 10,
      w: 1,
      h: 2,
      minH: 1,
      minW: 1,
      autosize: true,
    },
    {
      i: "balancetip",
      x: 0,
      y: 3,
      w: 2,
      h: 2,
      minH: 1,
      minW: 1,
      autosize: true,
    },
  ],
  xs: [
    {
      i: "calendar",
      x: 0,
      y: 10,
      w: 1,
      h: 2,
      minH: 2,
      minW: 1,
      autosize: true,
    },
    { i: "clock", x: 0, y: 0, w: 1, h: 2, minH: 2, minW: 1, autosize: true },
    {
      i: "filemanagement",
      x: 0,
      y: 13,
      w: 1,
      h: 1,
      minH: 1,
      minW: 1,
      autosize: true,
    },
    { i: "notepad", x: 0, y: 20, w: 1, h: 4, minH: 2, minW: 1, autosize: true },
    { i: "schedule", x: 0, y: 3, w: 1, h: 4, minH: 4, minW: 1, autosize: true },
    {
      i: "stickynote",
      x: 0,
      y: 8,
      w: 1,
      h: 2,
      minH: 2,
      minW: 1,
      autosize: true,
    },
    {
      i: "todolist",
      x: 0,
      y: 14,
      w: 1,
      h: 3,
      minH: 3,
      minW: 1,
      autosize: true,
    },
    {
      i: "meditation",
      x: 0,
      y: 12,
      w: 1,
      h: 1,
      minH: 1,
      minW: 1,
      autosize: true,
    },
    {
      i: "inspiringquote",
      x: 0,
      y: 7,
      w: 1,
      h: 1,
      minH: 1,
      minW: 1,
      autosize: true,
    },
    {
      i: "balancetip",
      x: 0,
      y: 18,
      w: 1,
      h: 2,
      minH: 1,
      minW: 1,
      autosize: true,
    },
  ],
};

const WidgetGrid = () => {
  const userProfile = AuthService.getProfile();

  const [updateGridSettings] = useMutation(UPDATE_GRID_SETTINGS);
  const [initialLayout, setInitialLayout] = useState(defaultLayout);
  const { loading, error, data } = useQuery(QUERY_USER_SETTINGS, {
    variables: { userId: userProfile?._id || userProfile?.user?._id },
  });

  useEffect(() => {
    const userProfile = AuthService.getProfile();
    const userLayout = userProfile?.settings?.gridLayout;

    if (userLayout) {
      setInitialLayout(userLayout);
    }
  }, []);

  const handleLayoutChange = (__, layouts) => {
    const userProfile = AuthService.getProfile();

    if (!userProfile) {
      console.error("User profile not found. Please log in.");
      // Handle this case, e.g., redirect to login page
      return;
    }

    const userId = userProfile._id || userProfile.user._id;

    if (!userId) {
      console.error("Invalid user ID. Unable to update user settings.");
      return;
    }

    const layoutsString = JSON.stringify(layouts);

    updateGridSettings({
      variables: { userId: userId, layouts: layoutsString },
    });
  };

  const userSettings = data?.getUserSettings;

  if (!userSettings) {
    // Handle the case where userSettings is undefined or null
    console.error("User settings not found in query result.");
    return <p>Error loading user settings. Please try again later.</p>;
  }

  function convertGridItem(gridItem) {
    // Create a new object without the __typename property
    const { __typename, ...rest } = gridItem;
    return rest;
  }
  
  // Remove the __typename property from the main object
  const { __typename: mainTypename, ...gridLayoutWithoutTypename } = userSettings.gridLayout;
  
  const gridLayout = {
    ...gridLayoutWithoutTypename,
    lg: userSettings.gridLayout.lg.map(convertGridItem),
    md: userSettings.gridLayout.md.map(convertGridItem),
    sm: userSettings.gridLayout.sm.map(convertGridItem),
    xs: userSettings.gridLayout.xs.map(convertGridItem),
  };

  const margin = [18, 18];

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={gridLayout}
      breakpoints={{ lg: 1200, md: 992, sm: 600, xs: 360 }}
      cols={{ lg: 4, md: 4, sm: 2, xs: 1 }}
      margin={margin}
      draggableHandle=".widget-wf"
      draggableCancel=".widget-prevent-drag-wf"
      onLayoutChange={handleLayoutChange}
    >
      <div key="calendar" className="widget-wf widget-box-shadow-wf">
        <CalendarWidget />
      </div>
      <div key="clock" className="widget-wf widget-box-shadow-wf">
        <ClockWidget />
      </div>
      <div key="filemanagement" className="widget-wf widget-box-shadow-wf">
        <FileManagementWidget />
      </div>
      <div key="notepad" className="widget-wf widget-box-shadow-wf">
        <NotepadWidget />
      </div>
      <div key="schedule" className="widget-wf widget-box-shadow-wf">
        <ScheduleWidget />
      </div>
      <div key="stickynote" className="widget-wf widget-box-shadow-wf">
        <StickyNoteWidget />
      </div>
      <div key="todolist" className="widget-wf widget-box-shadow-wf">
        <ToDoListWidget />
      </div>
      <div key="meditation" className="widget-wf widget-box-shadow-wf">
        <MeditationWidget />
      </div>
      <div key="inspiringquote" className="widget-wf widget-box-shadow-wf">
        <InspiringQuoteWidget />
      </div>
      <div key="balancetip" className="widget-wf widget-box-shadow-wf">
        <BalanceTipWidget />
      </div>
    </ResponsiveGridLayout>
  );
};
export default WidgetGrid;
