// import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import Auth from "../utils/auth";

import WidgetGrid from "../components/WidgetGrid";

// TODO: Import any necessary mutations and queries

const Home = () => {
  useEffect(() => {
    const flowTextEl = document.querySelector(".flow-text-wf");
    const textBlockEl = document.querySelector(".blurb-text-wf");
    const blurbLink1El = document.querySelector(".blurb-link1-wf");
    const blurbLink2El = document.querySelector(".blurb-link2-wf");

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

    if (blurbLink1El) {
      setTimeout(() => {
        blurbLink1El.classList.add("fade-in-link-wf");
      }, 2500);
    }

    if (blurbLink2El) {
      setTimeout(() => {
        blurbLink2El.classList.add("fade-in-link-wf");
      }, 2500);
    }
  }, []);

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <div className="dashboard-widgets-wf">
            <h4 className="dashboard-title-wf">
              Welcome back, {Auth.getProfile().data.username}
            </h4>
            <div className="widget-container-wf">
              <WidgetGrid />
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
              <br />
              <br />
              Ready to begin?{" "}
              <span className="blurb-link1-wf">
                <Link to="/signup">Sign up</Link>
              </span>{" "}
              or{" "}
              <span className="blurb-link2-wf">
                <Link to="/login">log in</Link>
              </span>
              .
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
