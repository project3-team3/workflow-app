import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_USER_SETTINGS } from "../utils/queries.js";
import {
  UPDATE_THEME_SETTINGS,
  UPDATE_WIDGET_SETTINGS,
} from "../utils/mutations.js";
import AuthService from "../utils/auth.js";

const Settings = (props) => {
  // Declare userSettings state variable
  const [userSettings, setUserSettings] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // useEffect hook triggered after User Settings query is done
  useEffect(() => {
    if (data?.getUserSettings && data.getUserSettings.widgets) {
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
  }, [isLoaded]);

  const userProfile = AuthService.getProfile();

  const [currentMode, setCurrentMode] = useState();

  useEffect(() => {
    if (currentMode) {
      const userId = userProfile._id || userProfile.user._id;
      const htmlElement = document.querySelector("html");

      htmlElement.className = "";
      htmlElement.classList.add(currentMode);

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
    }
  }, [currentMode]);

  const [updateThemeSettings] = useMutation(UPDATE_THEME_SETTINGS);
  const [updateWidgetSettings] = useMutation(UPDATE_WIDGET_SETTINGS);

  const { loading, error, data } = useQuery(QUERY_USER_SETTINGS, {
    variables: { userId: userProfile?._id || userProfile?.user?._id },
  });

  useEffect(() => {
    if (!loading && data) {
      setUserSettings(data.getUserSettings || null);
  
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
        const htmlElement = document.querySelector("html");
        htmlElement.className = "";
        htmlElement.classList.add(userSettings?.currentTheme || "default-wf");
        setCurrentMode(userSettings?.currentTheme || "default-wf");
      } else {
        console.log("No color theme found in user settings.");
      }
  
      setIsLoaded(true);
    }
  }, [loading, data, userSettings]);

  const handleWidgetChange = (e) => {
    const userId = userProfile._id || userProfile.user._id;
    const widgetName = e.target.id;
    const widgetStatus = e.target.checked;

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

    const newWidgetsFormatted = newWidgets.map(
      ({ __typename, ...rest }) => rest
    );

    const newWidgetsString = JSON.stringify(newWidgetsFormatted);

    updateWidgetSettings({
      variables: { userId: userId, widgets: newWidgetsString },
    })
      .then((result) => {
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
