import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./Component/LoginForm.js";
import styles from "./Login.module.css";
import { useDispatch } from "react-redux";
import { storeDriver } from "../Slice/driverSlice";
import { storeRider } from "../Slice/riderSlice.js";
import TextInput from "../Components/Common/TextInput.js";
import SubmitButton from "../Components/Common/SubmitButton.js";
import styled from "styled-components";
import { login } from "../Utils/utils.js";
/* import { setupConnection } from '../Slice/socketSlice'; */

const MainWrapper = styled.main`
  width: 100%;
  height: 100%;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(true);
  const [email, setEmail] = useState("");
  const [commuterStatus, setCommuterStatus] = useState("");
  const [error, setError] = useState("");
  const [riderLoginButton, setRiderLoginButton] = useState(false);
  const [driverLoginButton, setDriverLoginButton] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setDisable(!username || !password);
  }, [username, password]);

  const handleUsernameChange = (data) => {
    setUsername(data);
  };

  const handlePasswordChange = (data) => {
    setPassword(data);
  };

  const handleEmailChange = (data) => {
    setEmail(data);
  };

  const handleCommuterStatusChange = (event) => {
    setCommuterStatus(event.target.value);
  };
  const handlRiderLogin = () => {
    navigate("/riderLogin");
  };
  const handleDriverLogin = () => {
    navigate("/driverLogin");
  };

  const handleSubmit = async () => {
    const payload = {
      userName: username,
      userPassword: password,
    };
    const existingRecordResponse = await login(payload);
    if (!existingRecordResponse.ok) {
      alert("OOPs username or passowrd is not corect");
    }
    const existingRecordData = await existingRecordResponse.json();
    if (existingRecordData.commuterType === "Rider") {
      setRiderLoginButton(true);
      dispatch(storeRider(existingRecordData));
      navigate("/riderLogin");
      return;
    } else if (existingRecordData.commuterType === "Driver") {
      setDriverLoginButton(true);
      dispatch(storeDriver(existingRecordData));
      navigate("/driverLogin");
      return;
    } else {
      <div className="alert">
        <span className="closebtn">&times;</span>
        <strong>OOps! Authentication Issues Suspected. </strong>
      </div>;
    }
  };

  const togglePasswordType = (e) => {
    e.preventDefault();
    if (passwordType === "text") {
      setPasswordType((type) => (type = "password"));
    } else {
      setPasswordType((type) => (type = "text"));
    }
  };

  return (
    <div className={styles.loginparentcontainer}>
      <nav className={styles.navBar}>
        <span>Carpool!!!</span>
      </nav>
      <main>
        <div className={styles.formContainer}>
          <LoginForm className={styles.loginForm}>
            <span>Login to enjoy offers while riding</span>

            <TextInput
              key="username"
              type="text"
              value={username}
              onchange={handleUsernameChange}
              className={styles.userName}
              autoFocus={true}
              required={true}
              placeholder="Username"
            />
            <div className={styles.passwordComponent}>
              <TextInput
                key="password"
                type={passwordType}
                value={password}
                onchange={handlePasswordChange}
                className={styles.userName}
                required={true}
                placeholder="Password"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class={styles.profileIcon}
                onClick={togglePasswordType}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>

            <div>
              <span>Don't have an account?</span>
              <a href="/createProfile">Sign up now</a>
            </div>

            <SubmitButton
              submitform={handleSubmit}
              className={styles.submitButton}
              disabled={disable}
            ></SubmitButton>
          </LoginForm>
        </div>
      </main>
    </div>
  );
};

export default Login;
