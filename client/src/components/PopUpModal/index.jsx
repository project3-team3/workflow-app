// Message Modal Window component
const PopUpModal = ({ isOpen, onClose, modalType = "confirm", children }) => {
  const handleButtonClick = (choice) => {
    console.log("[PopUpModal.jsx]: handleButtonClick called. choice:", choice);
    console.log("[PopUpModal.jsx]: Calling onClose (= closeModal):", onClose);
    onClose && onClose(choice);
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay-wf">
          <div className="modal-wf">
            {children}
            {modalType === "confirm" ? (
              <button
                className="waves-effect waves-light btn button-wf dark-button-wf modal-button-wf widget-prevent-drag-wf"
                onClick={onClose}
              >
                Ok
              </button>
            ) : modalType === "choice" ? (
              <div>
                <button
                  className="waves-effect waves-light btn button-wf dark-button-wf modal-button-wf widget-prevent-drag-wf"
                  onClick={() => handleButtonClick(true)}
                >
                  Ok
                </button>
                <button
                  className="waves-effect waves-light btn button-wf dark-button-wf modal-button-wf widget-prevent-drag-wf"
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
