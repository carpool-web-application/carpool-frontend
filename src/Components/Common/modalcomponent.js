const ModalComponent = ({ toggleModal, children }) => {
  const toggle = (event) => {
    event.preventDefault();
    toggleModal();
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={toggle}>
          X
        </span>
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;
