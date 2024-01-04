// Custom hook to update the color theme based on user's settings
import AuthService from "../utils/auth.js";
import { useQuery } from "@apollo/client";
import { QUERY_USER_SETTINGS } from "../utils/queries.js";

const useTheme = () => {
  // Get user profile
  const userProfile = AuthService.getProfile();

  // Get user settings
  const { loading, error, data } = useQuery(QUERY_USER_SETTINGS, {
    variables: { userId: userProfile._id || userProfile.user._id },
  });

  const getColorTheme = async () => {
    return new Promise((resolve, reject) => {
      if (loading) {
        console.log("Loading theme...");
        resolve("loading");
      }
  
      if (error) {
        console.log("Error fetching theme:", error.message);
        reject(error.message);
      }
  
      resolve(data.getUserSettings.currentTheme || "default-wf");
    });
  };

  const updateTheme = async () => {
    const colorTheme = await getColorTheme();

    // Set the color theme
    const htmlElement = document.querySelector("html");
    htmlElement.className = "";
    htmlElement.classList.add(colorTheme);

    // Store theme preference in localStorage
    localStorage.setItem("colorTheme", colorTheme);
  };

  return { getColorTheme, updateTheme };
};

export default useTheme;