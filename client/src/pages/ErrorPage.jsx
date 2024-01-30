// Error page (Hopefully you'll never see this)
import { useRouteError } from "react-router-dom";
import { useState, useEffect } from "react";

import BackButton from "../components/BackButton";

export default function ErrorPage() {
  // Check if the user is online
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Update online status when it changes
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Add event listeners for online/offline status
    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      // Remove event listeners when the component unmounts
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  const error = useRouteError();
  console.error(error);

  return (
    <div className="container">
      <div className="error-page-wf">
        {isOnline ? (
          <>
            <h1>This one is on us.</h1>
            <p>Sorry, there was an error processing your request.</p>
            <p>
              <i>{error.statusText || error.message}</i>
            </p>
          </>
        ) : (
          <>
            <h1>Uh oh.</h1>
            <p>You are offline.</p>
            <p>Please check your internet connection and try again.</p>
          </>
        )}
        <BackButton />
      </div>
    </div>
  );
}
