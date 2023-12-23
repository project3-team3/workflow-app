import AuthService from "../utils/auth.js";
import { useQuery } from "@apollo/client";
import { QUERY_USER_SETTINGS } from "../utils/queries.js";
import BackButton from "../components/BackButton";

const VideoChat = () => {
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
    <div className="container">
      <div className="admin-message-wf">
        <h1>Video Chat</h1>
        <p>Coming soon!</p>
        <BackButton />
      </div>
    </div>
  );
};

export default VideoChat;
