// Message Modal Window component
const PopUpModal = ({ isOpen, onClose, modalType = "confirm", children }) => {
  const handleButtonClick = (choice) => {
    onClose(choice); // Pass the user's choice to the onClose function
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay-wf">
          <div className="modal-wf">
            {children}
            {modalType === "confirm" ? (
              <button
                className="waves-effect waves-light btn button-wf dark-button-wf modal-button-wf"
                onClick={onClose}
              >
                Ok
              </button>
            ) : modalType === "choice" ? (
              <div>
                <button
                  className="waves-effect waves-light btn button-wf dark-button-wf modal-button-wf"
                  onClick={() => handleButtonClick(true)}
                >
                  Ok
                </button>
                <button
                  className="waves-effect waves-light btn button-wf dark-button-wf modal-button-wf"
                  onClick={() => handleButtonClick(false)}
                >
                  Cancel
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpModal;
