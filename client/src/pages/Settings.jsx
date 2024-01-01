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
  console.log("*** NEW RENDER ***");

  // TODO: Remove these test variables after testing is done
  const [checkboxUpdateHookFirstRun, setCheckboxUpdateHookFirstRun] =
    useState(true);
  const [dropdownUpdateHookFirstRun, setDropdownUpdateHookFirstRun] =
    useState(true);
  const [colorThemeUpdateHookFirstRun, setColorThemeUpdateHookFirstRun] =
    useState(true);
  const [settingsUpdateHookFirstRun, setSettingsUpdateHookFirstRun] =
    useState(true);

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
        // TODO: Change this to a modal
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the install prompt");
          } else {
            console.log("User dismissed the install prompt");
          }

          deferredPrompt = null;
        });
      });
  }

  function updateColorTheme(mode) {
    console.log("[UPDATECOLORTHEME]: Updating color theme to:", mode);
    const htmlElement = document.querySelector("html");

    htmlElement.className = "";
    htmlElement.classList.add(mode);
    console.log(
      "[UPDATECOLORTHEME]: Updating <html> element applied class:",
      htmlElement.classList
    );

    console.log("[UPDATECOLORTHEME]: Setting currentMode to:", mode);
  }

  function updateColorThemeDropdown() {
    // TODO: Add logic to update the dropdown to match the current color theme
    console.log(
      "[UPDATECOLORTHEMEDROPDOWN]: Function triggered. Update color theme dropdown here!"
    );
    setCurrentMode(data.getUserSettings.currentTheme);
  }

  function updateCheckboxStatuses() {
    const checkboxes = document.querySelectorAll(".checkbox-item-wf");
    console.log("[UPDATECHECKBOXSTATUSES]: checkboxes:", checkboxes);

    userSettings.widgets.forEach((widget) => {
      const checkbox = Array.from(checkboxes).find(
        (checkbox) => checkbox.id === widget.name
      );

      console.log("[UPDATECHECKBOXSTATUSES]: Checking", checkbox.id + "...");
      console.log(
        "[UPDATECHECKBOXSTATUSES]: Checkbox status:",
        checkbox.active
      );
      console.log("[UPDATECHECKBOXSTATUSES]: Widget status:", widget.active);
      console.log(
        "[UPDATECHECKBOXSTATUSES]:",
        checkbox.checked === widget.active
          ? "Checkbox status matches widget status. No need for updating,"
          : "Checkbox status does not match widget status. Value needs updating."
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
    settingsUpdateHookFirstRun
      ? console.log(
          "[SETTINGS UPDATE USEEFFECT]: useEffect triggered (First run trigger)."
        )
      : console.log(
          "[SETTINGS UPDATE USEEFFECT]: either loading or data has changed."
        );
    console.log(
      "[SETTINGS UPDATE USEEFFECT]: loading:",
      loading,
      "data:",
      data
    );
    if (!loading && data) {
      // Update user settings and current theme after component mounts
      console.log(
        "[SETTINGS UPDATE USEEFFECT]: Updating userSettings to:",
        data.getUserSettings
      );
      setUserSettings(data.getUserSettings || null);
    } else {
      console.log(
        "[SETTINGS UPDATE USEEFFECT]: Still loading, no data obtained. Skipping update... loading:",
        loading,
        "data:",
        data
      );
    }
    // Remove this after testing is done
    setSettingsUpdateHookFirstRun(false);
  }, [loading, data]);

  useEffect(() => {
    checkboxUpdateHookFirstRun
      ? console.log(
          "[CHECKBOX UPDATE USEEFFECT]: useEffect triggered (First run trigger)."
        )
      : console.log(
          "[CHECKBOX UPDATE USEEFFECT]: Widget useEffect triggered (isLoaded value has changed)."
        );

    // Set widget checkboxes to match user settings after component mounts
    if (data?.getUserSettings && data.getUserSettings.widgets) {
      console.log(
        "[CHECKBOX UPDATE USEEFFECT]: User settings found! Updating checkbox statuses..."
      );

      updateCheckboxStatuses();
      setCheckboxUpdateComplete(true);
    } else {
      console.log(
        "[CHECKBOX UPDATE USEEFFECT]: No user settings found. Skipping update..."
      );
    }
    // TODO: Remove this after testing is done
    setCheckboxUpdateHookFirstRun(false);
  }, [userSettings]);

  useEffect(() => {
    dropdownUpdateHookFirstRun
      ? console.log(
          "[DROPDOWN UPDATE USEEFFECT]: useEffect triggered (First run trigger)."
        )
      : console.log(
          "[DROPDOWN UPDATE USEEFFECT]: Color Theme Dropdown useEffect triggered (isLoaded value has changed)."
        );
    // Set widget checkboxes to match user settings after component mounts
    if (data?.getUserSettings && data.getUserSettings.currentTheme) {
      console.log(
        "[DROPDOWN UPDATE USEEFFECT]: User settings found! Updating dropdown..."
      );

      updateColorThemeDropdown();
      setDropdownUpdateComplete(true);
    } else {
      console.log(
        "[DROPDOWN UPDATE USEEFFECT]: No user settings found. Skipping update..."
      );
    }
    // TODO: Remove this after testing is done
    setDropdownUpdateHookFirstRun(false);
  }, [userSettings]);

  useEffect(() => {
    colorThemeUpdateHookFirstRun
      ? console.log(
          "[COLOR THEME UPDATE USEEFFECT]: useEffect triggered (First run trigger)."
        )
      : console.log(
          "[COLOR THEME UPDATE USEEFFECT]: useEffect triggered (currentMode value has changed). Updating color theme..."
        );
    console.log("[COLOR THEME UPDATE USEEFFECT]: currentMode:", currentMode);
    console.log(
      "[COLOR THEME UPDATE USEEFFECT]: <html> element applied class:",
      document.querySelector("html").classList
    );
    if (currentMode) {
      console.log(
        "[COLOR THEME UPDATE USEEFFECT]:",
        currentMode === document.querySelector("html").classList[0]
          ? "currentMode matches <html> element applied class. No need for updating."
          : "currentMode does not match <html> element applied class. Value needs updating."
      );
    }
    // Set color theme to match user settings when a new theme is selected by the user
    if (currentMode) {
      const userId = userProfile._id || userProfile.user._id;

      updateColorTheme(currentMode);

      // Update user settings with new color theme
      updateThemeSettings({
        variables: { userId, currentTheme: currentMode },
      })
        .then((result) => {
          console.log(
            "[COLOR THEME UPDATE USEEFFECT]: Mutation result:",
            result
          );
        })
        .catch((error) => {
          console.error(
            "[COLOR THEME UPDATE USEEFFECT]: Mutation error:",
            error
          );
        });

      // Store theme preference in localStorage
      localStorage.setItem("colorTheme", currentMode);
    } else {
      console.log(
        "[COLOR THEME UPDATE USEEFFECT]: No value currently assigned to currentMode.  No need for updating."
      );
    }
    // Remove this after testing is done
    setColorThemeUpdateHookFirstRun(false);
  }, [currentMode]);

  // Handle widget checkbox changes
  const handleWidgetChange = (e) => {
    const userId = userProfile._id || userProfile.user._id;
    const widgetName = e.target.id;
    const widgetStatus = e.target.checked;
    console.log(
      "[HANDLEWIDGETCHANGE]: Widget checkbox change detected (",
      widgetName,
      "=",
      widgetStatus,
      "). Updating widget status in User Settings..."
    );

    const newWidgets = userSettings.widgets.map((item) => {
      if (item.name === widgetName) {
        console.log(
          "[HANDLEWIDGETCHANGE]:",
          widgetName + "'s widget status is",
          item.active + "."
        );
        console.log(
          "[HANDLEWIDGETCHANGE]:",
          widgetStatus === item.active
            ? "Checkbox status matches widget status. No need for updating,"
            : "Checkbox status does not match widget status. Value needs updating."
        );
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

    console.log(
      "[HANDLEWIDGETCHANGE]: New widgets (user settings object):",
      newWidgetsFormatted
    );

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
