import "./TextInput.module.css";

function TextInput({
  type,
  onchange,
  className,
  autoFocus,
  required,
  placeholder,
  children,
}) {
  const updateUsername = (e) => {
    onchange(e.target.value);
  };
  return (
    <>
      <input
        type={type}
        onChange={updateUsername}
        className={className}
        autoFocus={autoFocus}
        required={required}
        placeholder={placeholder}
      >
        {children}
      </input>
    </>
  );
}

export default TextInput;
