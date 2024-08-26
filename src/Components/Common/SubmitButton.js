import "./TextInput.module.css";

function SubmitButton({ submitform, className }) {
  const submitForm = (e) => {
    e.preventDefault();
    submitform();
  };
  return (
    <button
      type="button"
      onClick={submitForm}
      name="Login"
      value="LOG IN"
      className={className}
    >
      {" "}
      LOG IN{" "}
    </button>
  );
}

export default SubmitButton;
