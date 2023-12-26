import AuthService from "../utils/auth.js";
import { useQuery } from "@apollo/client";
import { QUERY_USER_SETTINGS } from "../utils/queries.js";

const SupportUs = () => {
  const userProfile = AuthService.getProfile();
  const { loading, error, data } = useQuery(QUERY_USER_SETTINGS, {
    variables: { userId: userProfile._id || userProfile.user._id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const colorTheme = data.getUserSettings.currentTheme || "default-wf";

  const setMode = (mode) => {
    const htmlElement = document.querySelector("html");
    htmlElement.className = "";
    htmlElement.classList.add(mode);
  };

  setMode(colorTheme);

  const handleDonateClick = () => {
    window.open("https://donate.stripe.com/00gaEI7Dsakm8ZWbII", "_blank");
  };

  return (
    <div className="container">
      <div className="admin-message-wf">
        <div className="support-wf">
          {colorTheme === "white-mode-wf" ? (
                      <img
                      className="logo-welcome-wf"
                      src="/tea_cup_dark.png"
                      alt="Buy us a Cup of Tea"
                    />
                  ) : (
                    <img
                    className="logo-welcome-wf"
                    src="/tea_cup.png"
                    alt="Buy us a Cup of Tea"
                  />
                  )}
          <h1>Support Us</h1>
          <p className="support-blurb-text-wf container">
            Found the perfect harmony in Workflow? Support our mission by buying
            us a cup of herbal tea — your donation fuels the pursuit of quality,
            harmony, and efficiency for all users.
          </p>
          <button
            onClick={handleDonateClick}
            className="waves-effect waves-light btn support-btn-wf button-wf"
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportUs;
