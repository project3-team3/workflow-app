import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const flowTextEl = useRef(null);
  const textBlockEl = useRef(null);
  const blurbLink1El = useRef(null);
  const blurbLink2El = useRef(null);
  const welcomeTextEl = useRef(null);

  useEffect(() => {
    let flowTextElWidth = 0;

    const handleWelcomeTransitionEnd = () => {
      welcomeTextEl.current.removeEventListener(
        "transitionend",
        handleWelcomeTransitionEnd
      );
    };

    const handleFlowTransitionEnd = () => {
      flowTextEl.current.removeEventListener(
        "transitionend",
        handleFlowTransitionEnd
      );
      flowTextEl.current.classList.remove("active");
      flowTextEl.current.classList.add("regular");
    };

    if (welcomeTextEl.current) {
      welcomeTextEl.current.addEventListener(
        "transitionend",
        handleWelcomeTransitionEnd
      );
    }

    if (flowTextEl.current) {
      flowTextElWidth = flowTextEl.current.offsetWidth;
      welcomeTextEl.current.style.marginLeft = `-${flowTextElWidth}px`;
      welcomeTextEl.current.classList.add("active");
      setTimeout(() => {
        flowTextEl.current.classList.add("active");
      }, 2000);
      flowTextEl.current.addEventListener(
        "transitionend",
        handleFlowTransitionEnd
      );
    }

    if (textBlockEl.current) {
      setTimeout(() => {
        textBlockEl.current.classList.add("fade-in-wf");
      }, 3500);
    }

    if (blurbLink1El.current) {
      setTimeout(() => {
        blurbLink1El.current.classList.add("fade-in-link-wf");
      }, 3500);
    }

    if (blurbLink2El.current) {
      setTimeout(() => {
        blurbLink2El.current.classList.add("fade-in-link-wf");
      }, 3500);
    }
  }, []);

  return (
    <div>
      <>
        <div className="welcome-wf">
          <img
            src="/logo_transparent.png"
            alt="logo"
            className="logo-welcome-wf"
          />
          <h1>
            <div className="welcome-to-work-flow-container-wf">
              <span className="welcome-to-work-wf" ref={welcomeTextEl}>
                Welcome to Work
              </span>
              <span id="flow-span-wf" ref={flowTextEl}>
                flow.
              </span>
            </div>
          </h1>
          <p ref={textBlockEl} className="blurb-text-wf container">
            Strike a balance with Workflow, your personal zen productivity hub.
            <div className="welcome-p-separator-wf"></div>
            Unleash your potential with a number of widgets to boost your
            efficiency (from organizers to video conferencing), while
            maintaining a healthy work/life balance through meditation,
            inspiring quotes and tips for improving your quality of life.
            <div className="welcome-p-separator-wf"></div>
            Ready to begin?{" "}
            <span ref={blurbLink1El} className="blurb-link1-wf">
              <Link to="/signup">Sign up</Link>
            </span>{" "}
            or{" "}
            <span ref={blurbLink2El} className="blurb-link2-wf">
              <Link to="/login">log in</Link>
            </span>
            .
          </p>
        </div>
      </>
    </div>
  );
};

export default Home;
