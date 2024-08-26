import styles from "./LoginForm.module.css";
function LoginForm({ className, children }) {
  return <form className={className}>{children}</form>;
}

export default LoginForm;
