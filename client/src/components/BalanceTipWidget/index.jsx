// Work/Life Balance Tip Widget
import { useQuery } from "@apollo/client";
import { QUERY_RANDOM_TIP } from "../../utils/queries.js";

const BalanceTipWidget = () => {

  // Query database for random tip
  const { loading, error, data } = useQuery(QUERY_RANDOM_TIP);

  if (loading) return "Loading...";
  if (error) return `Error fetching random tip: ${error.message}`;

  const balanceTip = data.randomTip.tipText;

  return (
    <div className="balance-tip-widget widget-content-wf">
      <div className="balance-tip-flex-container">
        <h2>Tip of the day</h2>
        <p className="balance-tip-random">{balanceTip}</p>
      </div>
    </div>
  );
  
};

export default BalanceTipWidget;
