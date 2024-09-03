import styled from "styled-components";

// Rename 'login' to 'Login' for proper React component naming
const Login = styled.form`
  color: black;
  max-width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 60px;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 5px 5px 10px #4d4d4d; /* Corrected property */
`;

function LoginForm({ children }) {
  return <Login>{children}</Login>;
}

export default LoginForm;
