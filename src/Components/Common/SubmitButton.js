import "./TextInput.module.css";

function SubmitButton({ submitform, className, disabled }) {
  console.log(disabled);
  const submitForm = (e) => {
    e.preventDefault();
    if (!disabled) {
      submitform();
    }
  };
  return (
    <button
      type="button"
      onClick={submitForm}
      name="Login"
      value="LOG IN"
      className={className}
      disabled={disabled}
    >
      {" "}
      LOG IN{" "}
    </button>
  );
}

export default SubmitButton;
