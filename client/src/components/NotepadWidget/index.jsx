// Notepad Widget component
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USER_SETTINGS } from "../../utils/queries.js";
import { UPDATE_NOTEPAD_SETTINGS } from "../../utils/mutations.js";
import AuthService from "../../utils/auth.js";

const NotepadWidget = () => {
  // Get the user profile
  const userProfile = AuthService.getProfile();

  const [updateNotepadSettings] = useMutation(UPDATE_NOTEPAD_SETTINGS);

  // Get the user's settings from the database
  const { loading, error, data } = useQuery(QUERY_USER_SETTINGS, {
    variables: { userId: userProfile?._id || userProfile?.user?._id },
  });

  const userSettings = data?.getUserSettings;

  if (!userSettings) {
    // Handle the case where userSettings is undefined or null
    console.error("User settings not found in query result.");
    return <p>Error loading user settings. Please try again later.</p>;
  }

  const [text, setText] = useState(userSettings.notepadText || "");

  useEffect(() => {
    // Update text when userSettings changes
    setText(userSettings.notepadText || "");
  }, [userSettings]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    const userId = userProfile._id || userProfile.user._id;

    // Update the user's notepad text in the database
    updateNotepadSettings({
      variables: { userId, notepadText: newText },
    });
  };

  return (
    <div className="notepad-widget widget-content-wf">
      <textarea
        className="notepad-textarea"
        contenteditable="true"
        value={text}
        onChange={handleTextChange}
        placeholder="Add your notes here..."
      ></textarea>
    </div>
  );
};

export default NotepadWidget;
