import { useState, useEffect } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USER_SETTINGS } from "../../utils/queries.js";
import { UPDATE_NOTEPAD_SETTINGS } from "../../utils/mutations.js";
import AuthService from "../../utils/auth.js";

const NotepadWidget = () => {
  const userProfile = AuthService.getProfile();

  const [updateNotepadSettings] = useMutation(UPDATE_NOTEPAD_SETTINGS);
  const { loading, error, data } = useQuery(QUERY_USER_SETTINGS, {
    variables: { userId: userProfile?._id || userProfile?.user?._id },
  });

  const userSettings = data?.getUserSettings;

  if (!userSettings) {
    // Handle the case where userSettings is undefined or null
    console.error("User settings not found in query result.");
    return <p>Error loading user settings. Please try again later.</p>;
  }

  console.log("userSettings: ", userSettings);

  console.log("Saved text: ", userSettings.notepadText);

  const [text, setText] = useState(userSettings.notepadText || "");

  console.log("State text: ", text);

  useEffect(() => {
    // Update text when userSettings changes
    setText(userSettings.notepadText || "");
  }, [userSettings]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    const userId = userProfile._id || userProfile.user._id;

    // Call the updateNotepadSettings mutation with the updated value of notepadText
    updateNotepadSettings({
      variables: { userId, notepadText: newText },
    });
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
