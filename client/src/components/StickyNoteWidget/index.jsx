import { useState, useEffect, useRef } from "react";
import "../../styles/widget.css";

const StickyNoteWidget = () => {
  const [note, setNote] = useState("");

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  return (
    <div className="sticky-note widget-content-wf">
      <textarea
        className="sticky-note-textarea"
        value={note}
        onChange={handleNoteChange}
        placeholder="Type your sticky note here..."
      ></textarea>
    </div>
  );
};

export default StickyNoteWidget;
