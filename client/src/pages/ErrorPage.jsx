// Error page
import { useRouteError } from "react-router-dom";

import BackButton from "../components/BackButton";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="container">
      <div className="error-page-wf">
        <h1>This one is on us...</h1>
        <p>Sorry, there was an error processing your request.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <BackButton />
      </div>
    </div>
  );
}
