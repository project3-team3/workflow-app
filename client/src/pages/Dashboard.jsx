import { useQuery } from "@apollo/client";
import { QUERY_USER_SETTINGS } from "../utils/queries.js";

import AuthService from "../utils/auth.js";

import WidgetGrid from "../components/WidgetGrid";

const Home = () => {
  const userProfile = AuthService.getProfile();
  const { loading, error, data } = useQuery(QUERY_USER_SETTINGS, {
    variables: { userId: userProfile._id || userProfile.user._id },
  });

  // Wait for data to load
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const colorTheme = data.getUserSettings.currentTheme || "default-wf";

  const setMode = (mode) => {
    const htmlElement = document.querySelector("html");
    htmlElement.className = "";
    htmlElement.classList.add(mode);
  };

  setMode(colorTheme);

  return (
    <div>
        <>
          <div className="dashboard-widgets-wf">
            <div className="widget-container-wf">
              <WidgetGrid />
            </div>
          </div>
        </>
    </div>
  );
};

export default Home;
