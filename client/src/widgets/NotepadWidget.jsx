import { useState } from 'react';
import "../styles/widget.css";

const NotepadWidget = () => {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="notepad-widget">
      <h2>Notepad</h2>
      <textarea
        className="notepad-textarea"
        value={text}
        onChange={handleTextChange}
        placeholder="Start typing..."
      ></textarea>
    </div>
  );
};

export default NotepadWidget;
