// User settings page
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_USER_SETTINGS } from "../utils/queries.js";
import {
  UPDATE_THEME_SETTINGS,
  UPDATE_WIDGET_SETTINGS,
} from "../utils/mutations.js";
import AuthService from "../utils/auth.js";

import LoadingSpinner from "../components/LoadingSpinner/index.jsx";

const Settings = (props) => {
  const [userSettings, setUserSettings] = useState(null);
  const [checkboxUpdateComplete, setCheckboxUpdateComplete] = useState(false);
  const [dropdownUpdateComplete, setDropdownUpdateComplete] = useState(false);

  let deferredPrompt;

  // Check for PWA installation before showing install button
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();

    deferredPrompt = event;

    showInstallButton();
  });

  // Show PWA install button if application hasn't been installed locally
  function showInstallButton() {
    document.getElementById("pwa-install-wf").style.display = "block";

    document
      .getElementById("pwa-install-button")
      .addEventListener("click", () => {
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then(() => {
          deferredPrompt = null;
        });
      });
  }

  // Update color theme
  function updateColorTheme(mode) {
    const htmlElement = document.querySelector("html");

    htmlElement.className = "";
    htmlElement.classList.add(mode);
  }

  // Update color theme dropdown
  function updateColorThemeDropdown() {
    setCurrentMode(data.getUserSettings.currentTheme);
  }

  // Update widget checkboxes
  function updateCheckboxStatuses() {
    const checkboxes = document.querySelectorAll(".checkbox-item-wf");

    userSettings.widgets.forEach((widget) => {
      const checkbox = Array.from(checkboxes).find(
        (checkbox) => checkbox.id === widget.name
      );

      if (checkbox) {
        checkbox.checked = widget.active;
      }
    });
  }

  // Get user profile
  const userProfile = AuthService.getProfile();

  const [currentMode, setCurrentMode] = useState();

  const [updateThemeSettings] = useMutation(UPDATE_THEME_SETTINGS);
  const [updateWidgetSettings] = useMutation(UPDATE_WIDGET_SETTINGS);

  // Get user settings
  const { loading, error, data } = useQuery(QUERY_USER_SETTINGS, {
    variables: { userId: userProfile?._id || userProfile?.user?._id },
  });

  useEffect(() => {
    if (!loading && data) {
      // Update user settings and current theme after component mounts
      setUserSettings(data.getUserSettings || null);
    }
  }, [loading, data]);

  useEffect(() => {
    // Set widget checkboxes to match user settings after component mounts
    if (data?.getUserSettings && data.getUserSettings.widgets) {
      updateCheckboxStatuses();
      setCheckboxUpdateComplete(true);
    }
  }, [userSettings]);

  useEffect(() => {
    // Set color theme dropdown to match user settings after component mounts
    if (data?.getUserSettings && data.getUserSettings.currentTheme) {
      updateColorThemeDropdown();
      setDropdownUpdateComplete(true);
    }
  }, [userSettings]);

  useEffect(() => {
    // Set color theme to match user settings when a new theme is selected by the user
    if (currentMode) {
      const userId = userProfile._id || userProfile.user._id;

      updateColorTheme(currentMode);

      // Update user settings with new color theme
      updateThemeSettings({
        variables: { userId, currentTheme: currentMode },
      })
        .then((result) => {
          console.log("Mutation result:", result);
        })
        .catch((error) => {
          console.error("Mutation error:", error);
        });

      // Store theme preference in localStorage
      localStorage.setItem("colorTheme", currentMode);
    }
  }, [currentMode]);

  // Handle widget checkbox changes
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

    // Remove __typename property from each widget object
    const newWidgetsFormatted = newWidgets.map(
      ({ __typename, ...rest }) => rest
    );

    const newWidgetsString = JSON.stringify(newWidgetsFormatted);

    // Update user settings with new widget settings
    updateWidgetSettings({
      variables: { userId: userId, widgets: newWidgetsString },
    })
      .then((result) => {
        const updatedUserSettings = result.data.updateWidgetSettings;
        setUserSettings(updatedUserSettings);
      })
      .catch((error) => {
        console.error("Mutation error:", error);
      });
  };

  return (
    <>
      <div
        className={
          checkboxUpdateComplete && dropdownUpdateComplete ? "hidden-wf" : ""
        }
      >
        <LoadingSpinner />
      </div>
      <div
        className={
          checkboxUpdateComplete && dropdownUpdateComplete ? "" : "hidden-wf"
        }
      >
        <div className="box-container-wf">
          <div className="box-wf">
            <h4>Settings</h4>
            <p className="settings-header-wf">Color Scheme</p>
            <select
              className="browser-default settings-dropdown-wf"
              value={currentMode}
              onChange={(e) => setCurrentMode(e.target.value)}
            >
              <option value="default-mode-wf">Default</option>
              <option value="blue-mode-wf">Aqua</option>
              <option value="beige-mode-wf">Dulcet</option>
              <option value="white-mode-wf">Mondrian</option>
              <option value="brown-mode-wf">Ligneous</option>
              <option value="green-mode-wf">Kumquat</option>
              <option value="purple-mode-wf">Spectrum</option>
              <option value="rainbow-mode-wf">Retinicide</option>
              <option value="dark-mode-wf">Dark</option>
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
            <br />
            <div id="pwa-install-wf">
              <p className="settings-header-wf">Install Workflow</p>
              <button
                id="pwa-install-button"
                className="waves-effect waves-light btn install-button-wf button-wf"
              >
                Install
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
