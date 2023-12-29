// Main dashboard page
import { useQuery } from "@apollo/client";
import { QUERY_USER_SETTINGS } from "../utils/queries.js";

import AuthService from "../utils/auth.js";
import Auth from "../utils/auth.js";

import WidgetGrid from "../components/WidgetGrid";

const Home = () => {
  // Get the user profile
  const userProfile = AuthService.getProfile();

  // Get the user's settings from the database
  const { loading, error, data } = useQuery(QUERY_USER_SETTINGS, {
    variables: { userId: userProfile._id || userProfile.user._id },
  });

  if (loading)
    return (
      <div className="spinner-container-wf">
        <div className="preloader-wrapper big active">
          <div className="spinner-layer">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    );
  if (error) {
    Auth.logout();
    window.location.href = "/";
    return <p>Error: {error.message}</p>;
  }

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

  return (
    <div>
      <>
        <div className="dashboard-widgets-wf">
          <div className="widget-container-wf">
            {/* Render the Widget Grid */}
            <WidgetGrid />
          </div>
        </div>
      </>
    </div>
  );
};

export default Home;
