import { useQuery } from "@apollo/client";
import { useEffect } from "react";

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
    <div className="welcome-wf">
      {/* TODO: Add Home content */}
      <img src="/logo_transparent.png" alt="logo" className="logo-home-wf" />
      <h1>
        Welcome to Work<span className="flow-text-wf">flow.</span>
      </h1>
      <p className="blurb-text-wf container">
        Strike a balance with Workflow, your personal zen productivity hub.
        <br />
        <br />
        Unleash your potential with a number of widgets to boost your efficiency
        (from organizers to video conferencing), while maintaining a healthy
        work/life balance through meditation, inspiring quotes and tips for
        improving your quality of life.
      </p>
    </div>
  );
};

export default Home;
