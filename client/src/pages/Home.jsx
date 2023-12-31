// Welcome page
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  // Select the HTML element to check for color theme
  const htmlElement = document.documentElement;

  // Select elements to animate
  const flowTextEl = useRef(null);
  const textBlockEl = useRef(null);
  const blurbLink1El = useRef(null);
  const blurbLink2El = useRef(null);
  const welcomeTextEl = useRef(null);

  useEffect(() => {
    let flowTextElWidth = 0;

    // Remove the transitionend event listener for "Welcome to Work" when the transition ends
    const handleWelcomeTransitionEnd = () => {
      welcomeTextEl.current.removeEventListener(
        "transitionend",
        handleWelcomeTransitionEnd
      );
    };

    // Remove the transitionend event listener for "flow" when the transition ends
    const handleFlowTransitionEnd = () => {
      flowTextEl.current.removeEventListener(
        "transitionend",
        handleFlowTransitionEnd
      );

      // Change classes to trigger "flow" second transition
      flowTextEl.current.classList.remove("active");
      flowTextEl.current.classList.add("regular");
    };

    // Add the transitionend event listener for "Welcome to Work" after it loads
    if (welcomeTextEl.current) {
      welcomeTextEl.current.addEventListener(
        "transitionend",
        handleWelcomeTransitionEnd
      );
    }

    if (flowTextEl.current) {
      // Get the width of the "flow" text element in the current viewport
      flowTextElWidth = flowTextEl.current.offsetWidth;

      // Set the margin-left of the "flow" text element to the negative width of the element
      welcomeTextEl.current.style.marginLeft = `-${flowTextElWidth}px`;
      // Change classes to trigger "Welcome to Work" transition
      welcomeTextEl.current.classList.add("active");

      // Add a timeout to trigger "flow" first transition
      setTimeout(() => {
        flowTextEl.current.classList.add("active");
      }, 2000);

      // Add the transitionend event listener for "flow" after it loads
      flowTextEl.current.addEventListener(
        "transitionend",
        handleFlowTransitionEnd
      );
    }

    // Add a timeout to trigger the fade-in animation for the text block and links
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
            src={htmlElement.classList.contains("white-mode-wf") ? "/logo_dark_transparent.png" : "/logo_transparent.png"}
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
            <span className="welcome-p-separator-wf"></span>
            Unleash your potential with a number of widgets to boost your
            efficiency (from organizers to video conferencing), while
            maintaining a healthy work/life balance through meditation,
            inspiring quotes and tips for improving your quality of life.
            <span className="welcome-p-separator-wf"></span>
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
