import styles from "./ModalComponent.module.css";

const ModalComponent = ({ toggleModal, children }) => {
  const toggle = (event) => {
    event.preventDefault();
    toggleModal();
  };
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={toggle}>
          X
        </span>
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;
