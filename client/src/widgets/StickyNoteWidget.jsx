import { useState } from 'react';
import "../styles/widget.css";

const StickyNoteWidget = () => {
const [note, setNote] = useState('');

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  return (
    <div className="sticky-note">
      <textarea
        className="sticky-note-textarea"
        value={note}
        onChange={handleNoteChange}
        placeholder="Type your note here..."
      ></textarea>
    </div>
  );
};

export default StickyNoteWidget;
