// Loading spinner component
const LoadingSpinner = () => {
  return (
    <div className="spinner-container-wf">
      <div className="preloader-wrapper big active">
        <div className="spinner-layer">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
