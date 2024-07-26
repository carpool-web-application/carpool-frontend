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
  console.log(children);
  const updateUsername = (e) => {
    onchange(e.target.value);
  };
  return (
    <div className="Input-text">
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
    </div>
  );
}

export default TextInput;
