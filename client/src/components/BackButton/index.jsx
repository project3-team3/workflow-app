import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button onClick={goBack} className="waves-effect waves-light btn button-wf error-back-btn-wf">
      Go Back
    </button>
  );
};

export default BackButton;