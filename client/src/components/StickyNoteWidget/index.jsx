// Sticky Note Widget component
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USER_SETTINGS } from "../../utils/queries.js";
import { UPDATE_STICKY_SETTINGS } from "../../utils/mutations.js";
import AuthService from "../../utils/auth.js";

const stickyTextWidget = () => {
  // Get the user profile
  const userProfile = AuthService.getProfile();

  const [updateStickySettings] = useMutation(UPDATE_STICKY_SETTINGS);

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

  const [note, setNote] = useState(userSettings.stickyText || "");

  useEffect(() => {
    // Update note when userSettings changes
    setNote(userSettings.stickyText || "");
  }, [userSettings]);

  const handleNoteChange = (e) => {
    const newNote = e.target.value;
    setNote(newNote);

    const userId = userProfile._id || userProfile.user._id;

    // Update the user's sticky note text in the database
    updateStickySettings({
      variables: { userId, stickyText: newNote },
    });
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

export default stickyTextWidget;
