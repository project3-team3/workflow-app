import { useQuery } from "@apollo/client";
import { useEffect } from "react";

import Auth from "../utils/auth";

// TODO: Import any necessary mutations and queries

const Home = () => {
  useEffect(() => {
    const flowTextEl = document.querySelector(".flow-text-wf");
    const textBlockEl = document.querySelector(".blurb-text-wf");

    const handleTransitionEnd = () => {
      flowTextEl.removeEventListener("transitionend", handleTransitionEnd);

      flowTextEl.classList.add("regular");
    };

    if (flowTextEl) {
      flowTextEl.classList.add("active");

      flowTextEl.addEventListener("transitionend", handleTransitionEnd);
    }

    if (textBlockEl) {
      setTimeout(() => {
        textBlockEl.classList.add("fade-in-wf");
      }, 2500);
    }
  }, []);

  return (
    // TODO: Temporary placeholder code - replace with dynamically generated widgets
    <div>
      {Auth.loggedIn() ? (
        <>
          <div className="dashboard-widgets-wf">
            <h4 className="dashboard-title-wf">
              Welcome back, {Auth.getProfile().data.username}
            </h4>
            <div className="widget-container-wf">
              <div className="widget-wf z-depth-4"></div>
              <div className="widget-wf z-depth-4"></div>
              <div className="widget-wf z-depth-4"></div>
              <div className="widget-wf z-depth-4"></div>
              <div className="widget-wf z-depth-4"></div>
              <div className="widget-wf z-depth-4"></div>
              <div className="widget-wf z-depth-4"></div>
              <div className="widget-wf z-depth-4"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="welcome-wf">
            <img
              src="/logo_transparent.png"
              alt="logo"
              className="logo-home-wf"
            />
            <h1>
              Welcome to Work<span className="flow-text-wf">flow.</span>
            </h1>
            <p className="blurb-text-wf container">
              Strike a balance with Workflow, your personal zen productivity
              hub.
              <br />
              <br />
              Unleash your potential with a number of widgets to boost your
              efficiency (from organizers to video conferencing), while
              maintaining a healthy work/life balance through meditation,
              inspiring quotes and tips for improving your quality of life.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
