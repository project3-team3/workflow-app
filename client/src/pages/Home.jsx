import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  console.log("Selecting elements.");
  const flowTextEl = useRef(null);
  console.log("flowTextEl:", flowTextEl);
  const textBlockEl = useRef(null);
  console.log("textBlockEl:", textBlockEl);
  const blurbLink1El = useRef(null);
  console.log("blurbLink1El:", blurbLink1El);
  const blurbLink2El = useRef(null);
  console.log("blurbLink2El:", blurbLink2El);
  const welcomeTextEl = useRef(null);
  console.log("welcomeTextEl:", welcomeTextEl);
  console.log("All elements selected.");

  useEffect(() => {
    let flowTextElWidth = 0;
    console.log("flowTextElWidth:", flowTextElWidth);

    const handleWelcomeTransitionEnd = () => {
      console.log("handleWelcomeTransitionEnd() triggered.");
      welcomeTextEl.current.removeEventListener(
        "transitionend",
        handleWelcomeTransitionEnd
      );
      console.log("Event listener removed from welcomeTextEl.");
    };

    const handleFlowTransitionEnd = () => {
      console.log("handleFlowTransitionEnd() triggered.");
      flowTextEl.current.removeEventListener(
        "transitionend",
        handleFlowTransitionEnd
      );
      console.log("Event listener removed from flowTextEl.");
      flowTextEl.current.classList.remove("active");
      console.log(
        'Class "active" removed from flowTextEl.',
        flowTextEl.current.classList
      );
      flowTextEl.current.classList.add("regular");
      console.log(
        'Class "regular" added to flowTextEl.',
        flowTextEl.current.classList
      );
      console.log('flowTextEl second "color" transition starting?');
    };

    if (welcomeTextEl.current) {
      console.log("welcomeTextEl is loaded.");
      welcomeTextEl.current.addEventListener(
        "transitionend",
        handleWelcomeTransitionEnd
      );
      console.log(
        "Event listener added to when welcomeTextEl's transition ends."
      );
    }

    if (flowTextEl.current) {
      console.log("flowTextEl is loaded.");
      flowTextElWidth = flowTextEl.current.offsetWidth;
      console.log("flowTextElWidth:", flowTextElWidth);
      welcomeTextEl.current.style.marginLeft = `-${flowTextElWidth}px`;
      console.log(
        'Property "marginLeft" set to (flowTextElWidth)px on welcomeTextEl?'
      );
      console.log(
        "welcomeTextEl.current.style.marginLeft:",
        welcomeTextEl.current.style.marginLeft
      );
      welcomeTextEl.current.classList.add("active");
      console.log(
        'Class "active" added to welcomeTextEl.',
        welcomeTextEl.current.classList
      );
      console.log('welcomeTextEl "margin-left" transition starting?');
      setTimeout(() => {
        console.log("Ding! (flowTextEl)");
        flowTextEl.current.classList.add("active");
        console.log(
          'Class "active" added to flowTextEl.',
          flowTextEl.current.classList
        );
        console.log('flowTextEl first "color" transition starting?');
      }, 2000);
      console.log("Timer set for 2s for flowTextEl.");
      flowTextEl.current.addEventListener(
        "transitionend",
        handleFlowTransitionEnd
      );
      console.log("Event listener added to when flowTextEl's transition ends.");
    }

    if (textBlockEl.current) {
      console.log("textBlockEl is loaded.");
      setTimeout(() => {
        console.log("Ding! (textBlockEl)");
        textBlockEl.current.classList.add("fade-in-wf");
        console.log(
          'Class "fade-in-wf" added to textBlockEl.',
          textBlockEl.current.classList
        );
        console.log('textBlockEl "opacity" transition starting?');
      }, 3500);
      console.log("Timer set for 3.5s for textBlockEl.");
    }

    if (blurbLink1El.current) {
      console.log("blurbLink1El is loaded.");
      setTimeout(() => {
        console.log("Ding! (blurbLink1El)");
        blurbLink1El.current.classList.add("fade-in-link-wf");
        console.log(
          'Class "fade-in-link-wf" added to blurbLink1El.',
          blurbLink1El.current.classList
        );
        console.log('blurbLink1El "opacity" transition starting?');
      }, 3500);
      console.log("Timer set for 3.5s for blurbLink1El.");
    }

    if (blurbLink2El.current) {
      console.log("blurbLink2El is loaded.");
      setTimeout(() => {
        console.log("Ding! (blurbLink2El)");
        blurbLink2El.current.classList.add("fade-in-link-wf");
        console.log(
          'Class "fade-in-link-wf" added to blurbLink2El.',
          blurbLink2El.current.classList
        );
        console.log('blurbLink2El "opacity" transition starting?');
      }, 3500);
      console.log("Timer set for 3.5s for blurbLink2El.");
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
            <br />
            <br />
            Unleash your potential with a number of widgets to boost your
            efficiency (from organizers to video conferencing), while
            maintaining a healthy work/life balance through meditation,
            inspiring quotes and tips for improving your quality of life.
            <br />
            <br />
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
