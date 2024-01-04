// Donation page
import { useEffect } from "react";
import useTheme from "../utils/useTheme.js";

const SupportUs = () => {
  const { updateTheme } = useTheme();

  useEffect(() => {
    updateTheme();
  }, [updateTheme]);

  // Send user to Stripe payment page
  const handleDonateClick = () => {
    window.open("https://donate.stripe.com/00gaEI7Dsakm8ZWbII", "_blank");
  };

  return (
    <div className="container">
      <div className="admin-message-wf">
        <div className="support-wf">
          <img
            className="logo-welcome-wf"
            src="/tea_cup.png"
            alt="Buy us a Cup of Tea"
          />
          <h1>Support Us</h1>
          <p className="support-blurb-text-wf container">
            Found the perfect harmony in Workflow? Support our mission by buying
            us a cup of herbal tea — your donation fuels the pursuit of quality,
            harmony, and efficiency for all users.
          </p>
          <button
            onClick={handleDonateClick}
            id="support-btn-wf"
            className="waves-effect waves-light btn button-wf"
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportUs;
