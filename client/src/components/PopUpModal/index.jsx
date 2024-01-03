// Message Modal Window component
const PopUpModal = ({ isOpen, onClose, modalType = "confirm", children }) => {

  // Pass user's choice back to the parent component
  const handleButtonClick = (choice) => {
    onClose && onClose(choice);
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay-wf">
          <div className="modal-wf">
            {children}
            {/* Display buttons according to modal type */}
            {modalType === "confirm" ? (
              <button
                className="waves-effect waves-light btn button-wf modal-button-wf widget-prevent-drag-wf"
                onClick={onClose}
              >
                Ok
              </button>
            ) : modalType === "choice" ? (
              <div>
                <button
                  className="waves-effect waves-light btn button-wf modal-button-wf widget-prevent-drag-wf"
                  onClick={() => handleButtonClick(true)}
                >
                  Ok
                </button>
                <button
                  className="waves-effect waves-light btn button-wf modal-button-wf widget-prevent-drag-wf"
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
