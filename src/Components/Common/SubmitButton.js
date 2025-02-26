import styles from "./submitButton.module.css";

function SubmitButton({ submitform, disabled, text }) {
  const submitForm = (e) => {
    e.preventDefault();
    if (!disabled) {
      console.log(e.key);
      submitform();
    }
  };
  return (
    <button
      type="submit"
      onClick={submitForm}
      name="Login"
      value="LOG IN"
      className={styles.submitButton}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default SubmitButton;
