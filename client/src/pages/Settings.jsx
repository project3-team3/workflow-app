import { useState, useEffect } from 'react';

const Settings = (props) => {

  const [currentMode, setCurrentMode] = useState('default-wf');

  useEffect(() => {
    // Set the initial mode when the component mounts
    setMode(props.currentMode);
  }, []); // Empty dependency array ensures this runs only once on mount

  const setMode = (mode) => {
    const htmlElement = document.querySelector('html');
    htmlElement.className = ''; // Remove all existing classes
    htmlElement.classList.add(mode); // Add the class for the selected mode
    setCurrentMode(mode); // Update the current mode in the state
  }

  return (
    <div className="box-container-wf">
      <div className="box-wf">
        <h4>Settings</h4>
        <p>Color Scheme</p>
        <select
          className="browser-default settings-dropdown-wf"
          value={currentMode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="default-mode-wf">Default Mode</option>
          <option value="blue-mode-wf">Blue Mode</option>
          <option value="white-mode-wf">Light Mode</option>
          <option value="dark-mode-wf">Dark Mode</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;
