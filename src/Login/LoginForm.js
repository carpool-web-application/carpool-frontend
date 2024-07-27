import styles from "./LoginForm.module.css";
function LoginForm({ className, children }) {
  return (
    <form className={className}>
      <span className={styles.InputFormSignText}>Sign in</span>
      {children}
    </form>
  );
}

export default LoginForm;
