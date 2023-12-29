// Main component for the Widget Grid
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

// Default layout values for the widget grid
export const defaultLayout = {
  lg: [
    {
      i: "calendar",
      x: 0,
      y: 2,
      w: 3,
      h: 2,
      minH: 2,
      minW: 3,
      autosize: true,
    },
    {
      i: "clock",
      x: 0,
      y: 0,
      w: 2,
      h: 2,
      minH: 2,
      minW: 2,
      autosize: true,
    },
    {
      i: "filemanagement",
      x: 5,
      y: 0,
      w: 3,
      h: 2,
      minH: 1,
      minW: 3,
      autosize: true,
    },
    {
      i: "notepad",
      x: 0,
      y: 8,
      w: 8,
      h: 2,
      minH: 2,
      minW: 3,
      autosize: true,
    },
    {
      i: "schedule",
      x: 9,
      y: 0,
      w: 4,
      h: 3,
      minH: 3,
      minW: 3,
      autosize: true,
    },
    {
      i: "stickynote",
      x: 2,
      y: 0,
      w: 3,
      h: 2,
      minH: 2,
      minW: 2,
      autosize: true,
    },
    {
      i: "todolist",
      x: 0,
      y: 4,
      w: 12,
      h: 4,
      minH: 3,
      minW: 8,
      autosize: true,
    },
    {
      i: "meditation",
      x: 10,
      y: 3,
      w: 4,
      h: 1,
      minH: 1,
      minW: 2,
      autosize: true,
    },
    {
      i: "inspiringquote",
      x: 9,
      y: 8,
      w: 4,
      h: 2,
      minH: 2,
      minW: 3,
      autosize: true,
    },
    {
      i: "balancetip",
      x: 3,
      y: 2,
      w: 5,
      h: 2,
      minH: 2,
      minW: 4,
      autosize: true,
    },
  ],
  md: [
    { i: "calendar", x: 5, y: 9, w: 3, h: 2, minH: 2, minW: 3, autosize: true },
    { i: "clock", x: 0, y: 0, w: 2, h: 2, minH: 2, minW: 2, autosize: true },
    {
      i: "filemanagement",
      x: 4,
      y: 5,
      w: 4,
      h: 1,
      minH: 1,
      minW: 3,
      autosize: true,
    },
    { i: "notepad", x: 4, y: 2, w: 4, h: 3, minH: 3, minW: 3, autosize: true },
    { i: "schedule", x: 0, y: 2, w: 4, h: 3, minH: 3, minW: 4, autosize: true },
    {
      i: "stickynote",
      x: 2,
      y: 0,
      w: 3,
      h: 2,
      minH: 2,
      minW: 2,
      autosize: true,
    },
    { i: "todolist", x: 0, y: 6, w: 8, h: 3, minH: 3, minW: 6, autosize: true },
    {
      i: "meditation",
      x: 0,
      y: 5,
      w: 4,
      h: 1,
      minH: 1,
      minW: 2,
      autosize: true,
    },
    {
      i: "inspiringquote",
      x: 5,
      y: 0,
      w: 3,
      h: 2,
      minH: 2,
      minW: 2,
      autosize: true,
    },
    {
      i: "balancetip",
      x: 0,
      y: 9,
      w: 5,
      h: 2,
      minH: 2,
      minW: 4,
      autosize: true,
    },
  ],
  sm: [
    {
      i: "calendar",
      x: 0,
      y: 13,
      w: 3,
      h: 2,
      minH: 2,
      minW: 3,
      autosize: true,
    },
    { i: "clock", x: 0, y: 0, w: 2, h: 2, minH: 2, minW: 2, autosize: true },
    {
      i: "filemanagement",
      x: 0,
      y: 2,
      w: 3,
      h: 1,
      minH: 1,
      minW: 2,
      autosize: true,
    },
    { i: "notepad", x: 0, y: 11, w: 6, h: 2, minH: 2, minW: 3, autosize: true },
    { i: "schedule", x: 0, y: 3, w: 6, h: 3, minH: 3, minW: 4, autosize: true },
    {
      i: "stickynote",
      x: 3,
      y: 6,
      w: 3,
      h: 2,
      minH: 2,
      minW: 3,
      autosize: true,
    },
    {
      i: "todolist",
      x: 0,
      y: 8,
      w: 6,
      h: 3,
      minH: 3,
      minW: 6,
      autosize: true,
    },
    {
      i: "meditation",
      x: 3,
      y: 2,
      w: 3,
      h: 1,
      minH: 1,
      minW: 3,
      autosize: true,
    },
    {
      i: "inspiringquote",
      x: 0,
      y: 6,
      w: 3,
      h: 2,
      minH: 2,
      minW: 2,
      autosize: true,
    },
    {
      i: "balancetip",
      x: 2,
      y: 0,
      w: 4,
      h: 2,
      minH: 2,
      minW: 3,
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
      h: 8,
      minH: 8,
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
      h: 2,
      minH: 1,
      minW: 1,
      autosize: true,
    },
    {
      i: "balancetip",
      x: 0,
      y: 18,
      w: 1,
      h: 3,
      minH: 3,
      minW: 1,
      autosize: true,
    },
  ],
};

const WidgetGrid = () => {
  // Get the user profile
  const userProfile = AuthService.getProfile();

  const [updateGridSettings] = useMutation(UPDATE_GRID_SETTINGS);

  // Get the user's settings from the database
  const { loading, error, data } = useQuery(QUERY_USER_SETTINGS, {
    variables: { userId: userProfile?._id || userProfile?.user?._id },
  });

  const handleLayoutChange = (__, layouts) => {
    // Get the user profile
    const userProfile = AuthService.getProfile();

    if (!userProfile) {
      console.error("User profile not found. Please log in.");
      return;
    }

    const userId = userProfile._id || userProfile.user._id;

    if (!userId) {
      console.error("Invalid user ID. Unable to update user settings.");
      return;
    }

    const layoutsString = JSON.stringify(layouts);

    // Update the user's grid layout in the database
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
  const { __typename: mainTypename, ...gridLayoutWithoutTypename } =
    userSettings.gridLayout;

  const gridLayout = {
    ...gridLayoutWithoutTypename,
    lg: userSettings.gridLayout.lg.map(convertGridItem),
    md: userSettings.gridLayout.md.map(convertGridItem),
    sm: userSettings.gridLayout.sm.map(convertGridItem),
    xs: userSettings.gridLayout.xs.map(convertGridItem),
  };

  const margin = [25, 25];

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={gridLayout}
      breakpoints={{ lg: 1200, md: 992, sm: 600, xs: 360 }}
      cols={{ lg: 12, md: 8, sm: 6, xs: 1 }}
      margin={margin}
      draggableHandle=".widget-wf"
      draggableCancel=".widget-prevent-drag-wf"
      onLayoutChange={handleLayoutChange}
    >
      {userSettings.widgets.map((widget) => {
        // Check if the widgets are active before rendering
        if (widget.active) {
          if (widget.name === "calendar") {
            return (
              <div key={widget.name} className="widget-wf widget-box-shadow-wf">
                <CalendarWidget />
              </div>
            );
          } else if (widget.name === "clock") {
            return (
              <div key={widget.name} className="widget-wf widget-box-shadow-wf">
                <ClockWidget />
              </div>
            );
          } else if (widget.name === "filemanagement") {
            return (
              <div key={widget.name} className="widget-wf widget-box-shadow-wf">
                <FileManagementWidget />
              </div>
            );
          } else if (widget.name === "notepad") {
            return (
              <div key={widget.name} className="widget-wf widget-box-shadow-wf">
                <NotepadWidget />
              </div>
            );
          } else if (widget.name === "schedule") {
            return (
              <div key={widget.name} className="widget-wf widget-box-shadow-wf">
                <ScheduleWidget />
              </div>
            );
          } else if (widget.name === "stickynote") {
            return (
              <div key={widget.name} className="widget-wf widget-box-shadow-wf">
                <StickyNoteWidget />
              </div>
            );
          } else if (widget.name === "todolist") {
            return (
              <div key={widget.name} className="widget-wf widget-box-shadow-wf">
                <ToDoListWidget />
              </div>
            );
          } else if (widget.name === "meditation") {
            return (
              <div key={widget.name} className="widget-wf widget-box-shadow-wf">
                <MeditationWidget />
              </div>
            );
          } else if (widget.name === "inspiringquote") {
            return (
              <div key={widget.name} className="widget-wf widget-box-shadow-wf">
                <InspiringQuoteWidget />
              </div>
            );
          } else if (widget.name === "balancetip") {
            return (
              <div key={widget.name} className="widget-wf widget-box-shadow-wf">
                <BalanceTipWidget />
              </div>
            );
          }
        }
        return null;
      })}
    </ResponsiveGridLayout>
  );
};

export default WidgetGrid;
