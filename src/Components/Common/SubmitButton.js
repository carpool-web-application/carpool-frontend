import "./TextInput.module.css";

function SubmitButton({ submitform }) {
  const submitForm = (e) => {
    e.preventDefault();
    submitform();
  };
  return (
    <div className="form-button">
      <button
        type="button"
        onClick={submitForm}
        name="Login"
        value="LOG IN"
        className="login-login-submit"
      >
        {" "}
        LOG IN{" "}
      </button>
      ;
    </div>
  );
}

export default SubmitButton;
