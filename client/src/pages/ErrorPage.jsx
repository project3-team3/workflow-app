import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>This one is on us...</h1>
      <p>Sorry, there was an error processing your request.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}