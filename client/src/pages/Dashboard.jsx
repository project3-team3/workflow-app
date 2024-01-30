// Main dashboard page
import ReactDOM from "react-dom/client";
import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { QUERY_USER_SETTINGS } from "../utils/queries.js";

import AuthService from "../utils/auth.js";

import LoadingSpinner from "../components/LoadingSpinner/index.jsx";
import WidgetGrid from "../components/WidgetGrid";
import PopUpModal from "../components/PopUpModal";

const Home = () => {
  // Check if the user is online
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Update online status when it changes
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Add event listeners for online/offline status
    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      // Remove event listeners when the component unmounts
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  // Open the modal dialog box for the File Manager component
  const openModal = async () => {
    // Wait for the user to make a choice before proceeding
    return new Promise((resolve) => {
      const modalRoot = document.getElementById("modal-root-wf");
      const modalContainer = document.createElement("div");
      modalRoot.appendChild(modalContainer);

      const closeModal = (choice) => {
        root.unmount();
        modalContainer.remove();
        resolve(choice);
      };

      // Render the modal dialog box
      const modalComponent = (
        <PopUpModal isOpen={true} onClose={closeModal} modalType="choice">
          <h2>Delete File</h2>
          <p>
            Are you sure you want to delete this file? This action cannot be
            undone.
          </p>
        </PopUpModal>
      );

      const root = ReactDOM.createRoot(modalContainer);
      root.render(modalComponent);
    });
  };

  // Get the user profile
  const userProfile = AuthService.getProfile();

  // Get the user's settings from the database
  const { loading, error, data } = useQuery(QUERY_USER_SETTINGS, {
    variables: { userId: userProfile._id || userProfile.user._id },
  });

  if (!loading && !error) {
    const colorTheme = data.getUserSettings.currentTheme || "default-wf";

    // Set the color theme to the user's saved theme
    const setMode = (mode) => {
      const htmlElement = document.querySelector("html");
      htmlElement.className = "";
      htmlElement.classList.add(mode);

      // Store theme preference in localStorage
      localStorage.setItem("colorTheme", mode);
    };

    setMode(colorTheme);
  }

  return isOnline ? (
    <div id="modal-root-wf">
      <div className={loading ? "" : "hidden-wf"}>
        <LoadingSpinner />
      </div>
      <div className={loading ? "hidden-wf" : ""}>
        <div className="dashboard-widgets-wf">
          <div className="widget-container-wf">
            {/* Render the Widget Grid */}
            <WidgetGrid openModal={openModal} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="offline-message-container-wf">
      <p className="offline-message-wf">
        You're offline. Please reconnect to use the dashboard.
      </p>
    </div>
  );
};

export default Home;
