import "./TextInput.module.css";

function SubmitButton({ submitform, className, disabled }) {
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
      className={className}
      disabled={disabled}
    >
      {" "}
      LOG IN{" "}
    </button>
  );
}

export default SubmitButton;
