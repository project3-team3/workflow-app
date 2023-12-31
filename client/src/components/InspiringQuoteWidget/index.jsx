// Inspirational Quote Widget component
import { useQuery } from "@apollo/client";
import { QUERY_RANDOM_QUOTE } from "../../utils/queries.js";

import LoadingSpinner from "../LoadingSpinner/index.jsx";

const InspiringQuoteWidget = () => {
  // Get a random quote from the database
  const { loading, error, data } = useQuery(QUERY_RANDOM_QUOTE);

  if (loading) return <LoadingSpinner />;
  if (error) return `Error fetching random quote: ${error.message}`;

  const quote = data.randomQuote.quoteText;
  const author = data.randomQuote.quoteBy;

  return (
    <div className="inspiring-quote-widget widget-content-wf">
      <div className="inspiring-quote-flex-container">
        <p className="inspiring-quote-random">{`"${quote}"`}</p>
        <p className="inspiring-quote-author">{`— ${author}`}</p>
      </div>
    </div>
  );
};

export default InspiringQuoteWidget;
