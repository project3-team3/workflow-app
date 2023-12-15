import { useState } from 'react';
import "../../styles/widget.css";

const NotepadWidget = () => {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="notepad-widget widget-content-wf">
      <textarea
        className="notepad-textarea"
        value={text}
        onChange={handleTextChange}
        placeholder="Add your notes here..."
      ></textarea>
    </div>
  );
};

export default NotepadWidget;
