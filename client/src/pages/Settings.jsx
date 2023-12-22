import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_USER_SETTINGS } from "../utils/queries.js";
import {
  UPDATE_THEME_SETTINGS,
  UPDATE_WIDGET_SETTINGS,
} from "../utils/mutations.js";
import AuthService from "../utils/auth.js";

const Settings = (props) => {
  console.log("--------- STARTING RENDER ---------");
  // Declare userSettings state variable
  const [userSettings, setUserSettings] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // useEffect hook triggered after User Settings query is done
  useEffect(() => {
    console.log("isLoaded has been changed - Starting widget useEffect hook");
    if (data?.getUserSettings && data.getUserSettings.widgets) {
      const checkboxes = document.querySelectorAll(".checkbox-item-wf");
      console.log("Checkbox elements selected:", checkboxes);

      console.log("Starting search for checkbox matches...");
      userSettings.widgets.forEach((widget) => {
        const checkbox = Array.from(checkboxes).find(
          (checkbox) => checkbox.id === widget.name
        );
        console.log("Checkbox found:", checkbox);
        if (checkbox) {
          checkbox.checked = widget.active;
        }
      });
    } else {
      console.log("No widgets found in user settings.");
    }
  }, [isLoaded]);

  const userProfile = AuthService.getProfile();
  console.log("User Profile fetched:", userProfile);

  const [currentMode, setCurrentMode] = useState();

  useEffect(() => {
    console.log("currentMode has been changed - Starting color theme useEffect hook");
    if (currentMode) {
      const userId = userProfile._id || userProfile.user._id;
      const htmlElement = document.querySelector("html");

      htmlElement.className = "";
      htmlElement.classList.add(currentMode);
      setCurrentMode(currentMode);

      console.log("Color scheme changed to:", currentMode);

      updateThemeSettings({
        variables: { userId, currentTheme: currentMode },
      })
        .then((result) => {
          console.log("Mutation result:", result);
        })
        .catch((error) => {
          console.error("Mutation error:", error);
        });
    } else {
      console.log("No color scheme yet, skipping theme change.");
    }
  }, [currentMode]);

  const [updateThemeSettings] = useMutation(UPDATE_THEME_SETTINGS);
  const [updateWidgetSettings] = useMutation(UPDATE_WIDGET_SETTINGS);

  const { loading, error, data } = useQuery(QUERY_USER_SETTINGS, {
    variables: { userId: userProfile?._id || userProfile?.user?._id },
  });

  useEffect(() => {
    if (!loading && data) {
      console.log("User Settings query done!");
      setUserSettings(data.getUserSettings || null);
      console.log("User Settings are:", userSettings);
  
      if (userSettings && userSettings.widgets) {
        const checkboxes = document.querySelectorAll(".checkbox-item-wf");
  
        userSettings.widgets.forEach((widget) => {
          const checkbox = Array.from(checkboxes).find(
            (checkbox) => checkbox.id === widget.name
          );
  
          if (checkbox) {
            checkbox.checked = widget.active;
          }
        });
      } else {
        console.log("No widgets found in user settings.");
      }
  
      if (userSettings && userSettings.currentTheme) {
        console.log("Setting color theme...", userSettings?.currentTheme);
  
        const htmlElement = document.querySelector("html");
        htmlElement.className = "";
        htmlElement.classList.add(userSettings?.currentTheme || "default-wf");
      } else {
        console.log("No color theme found in user settings.");
      }
  
      setIsLoaded(true);
    }
  }, [loading, data, userSettings]);

  const handleWidgetChange = (e) => {
    console.log("Box checked:", e.target);
    const userId = userProfile._id || userProfile.user._id;
    const widgetName = e.target.id;
    const widgetStatus = e.target.checked;

    console.log("Widget Name:", widgetName);
    console.log("Widget Active?", widgetStatus);
    console.log("userSettings before change:", userSettings);

    const newWidgets = userSettings.widgets.map((item) => {
      if (item.name === widgetName) {
        return {
          ...item,
          active: widgetStatus,
        };
      } else {
        return item;
      }
    });

    console.log("newWidgets:", newWidgets);

    const newWidgetsFormatted = newWidgets.map(
      ({ __typename, ...rest }) => rest
    );

    const newWidgetsString = JSON.stringify(newWidgetsFormatted);

    console.log(
      "newWidgets (to be pushed into userSettings):",
      newWidgetsString,
      typeof newWidgetsString
    );

    updateWidgetSettings({
      variables: { userId: userId, widgets: newWidgetsString },
    })
      .then((result) => {
        console.log("Mutation result:", result);
        // Assuming the mutation result contains the updated userSettings
        const updatedUserSettings = result.data.updateWidgetSettings; // Update accordingly
        setUserSettings(updatedUserSettings);
      })
      .catch((error) => {
        console.error("Mutation error:", error);
      });
  };

  return (
    <div className="box-container-wf">
      <div className="box-wf">
        <h4>Settings</h4>
        <p className="settings-header-wf">Color Scheme</p>
        <select
          className="browser-default settings-dropdown-wf"
          value={currentMode}
          onChange={(e) => setCurrentMode(e.target.value)}
        >
          <option value="default-mode-wf">Default Mode</option>
          <option value="blue-mode-wf">Blue Mode</option>
          <option value="white-mode-wf">Light Mode</option>
          <option value="dark-mode-wf">Dark Mode</option>
        </select>
        <br />
        <p className="settings-header-wf">Active Widgets</p>
        <form action="#">
          <div className="checkbox-container-wf">
            <p>
              <label htmlFor="calendar">
                <input
                  type="checkbox"
                  id="calendar"
                  className="checkbox-item-wf"
                  onChange={handleWidgetChange}
                />
                <span>Calendar</span>
              </label>
            </p>
            <p>
              <label htmlFor="clock">
                <input
                  type="checkbox"
                  id="clock"
                  className="checkbox-item-wf"
                  onChange={handleWidgetChange}
                />
                <span>Clock</span>
              </label>
            </p>
            <p>
              <label htmlFor="filemanagement">
                <input
                  type="checkbox"
                  id="filemanagement"
                  className="checkbox-item-wf"
                  onChange={handleWidgetChange}
                />
                <span>File Manager</span>
              </label>
            </p>
            <p>
              <label htmlFor="notepad">
                <input
                  type="checkbox"
                  id="notepad"
                  className="checkbox-item-wf"
                  onChange={handleWidgetChange}
                />
                <span>Notepad</span>
              </label>
            </p>
            <p>
              <label htmlFor="schedule">
                <input
                  type="checkbox"
                  id="schedule"
                  className="checkbox-item-wf"
                  onChange={handleWidgetChange}
                />
                <span>Daily Schedule</span>
              </label>
            </p>
            <p>
              <label htmlFor="stickynote">
                <input
                  type="checkbox"
                  id="stickynote"
                  className="checkbox-item-wf"
                  onChange={handleWidgetChange}
                />
                <span>Sticky Notes</span>
              </label>
            </p>
            <p>
              <label htmlFor="todolist">
                <input
                  type="checkbox"
                  id="todolist"
                  className="checkbox-item-wf"
                  onChange={handleWidgetChange}
                />
                <span>Kanban Board</span>
              </label>
            </p>
            <p>
              <label htmlFor="meditation">
                <input
                  type="checkbox"
                  id="meditation"
                  className="checkbox-item-wf"
                  onChange={handleWidgetChange}
                />
                <span>Meditation</span>
              </label>
            </p>
            <p>
              <label htmlFor="inspiringquote">
                <input
                  type="checkbox"
                  id="inspiringquote"
                  className="checkbox-item-wf"
                  onChange={handleWidgetChange}
                />
                <span>Inspirational Quotes</span>
              </label>
            </p>
            <p>
              <label htmlFor="balancetip">
                <input
                  type="checkbox"
                  id="balancetip"
                  className="checkbox-item-wf"
                  onChange={handleWidgetChange}
                />
                <span>Work/Life Balance Tips</span>
              </label>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
