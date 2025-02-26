import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useDispatch } from "react-redux";
import { storeDriver } from "../Slice/driverSlice";
import { storeRider } from "../Slice/riderSlice.js";
import SubmitButton from "../Components/Common/SubmitButton.js";
import { login } from "../Utils/utils.js";
/* import { setupConnection } from '../Slice/socketSlice'; */

const Login = ({ setExpiryTime, setIsAuthenticated, setTimer }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(true);
  const [errorFlag, setErrorFlag] = useState(false);
  const [error, setError] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setDisable(!username || !password);
  }, [username, password]);

  const handleUsernameChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const payload = {
      userName: username,
      userPassword: password,
    };
    const existingRecordResponse = await login(payload);
    if (!existingRecordResponse.ok) {
      setError("credentails are incorrect");
      setErrorFlag(true);
      return;
    }

    setError("");
    setErrorFlag(false);

    const existingRecordData = await existingRecordResponse.json();
    handleSession(existingRecordData.token);
    setExpiryTime(Date.now() + 3600000);
    setIsAuthenticated(true);
    setTimer();
    if (existingRecordData.commuterType === "Rider") {
      //setRiderLoginButton(true);
      dispatch(storeRider(existingRecordData));
      navigate("/searchRide");
      return;
    } else if (existingRecordData.commuterType === "Driver") {
      //setDriverLoginButton(true);
      dispatch(storeDriver(existingRecordData));
      navigate("/createRide");
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

  const handleSession = (token) => {
    localStorage.setItem("auth", token);
    sessionStorage.setItem("authTime", Date.now() + 10000);
  };
  return (
    <div className={styles.loginparentcontainer}>
      <nav className={styles.navBar}>
        <span>Carpool!!!</span>
      </nav>
      <main className={styles.mainLogin}>
        <div className={styles.formContainer}>
          <form className={styles.loginForm}>
            <span>Login to enjoy offers while riding</span>
            <div className={styles.inputContainer}>
              <input
                key="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className={errorFlag ? styles.userNameError : styles.userName}
                required={true}
              />
              <label>Username</label>
            </div>

            <div className={styles.inputContainer}>
              <input
                key="password"
                type={passwordType}
                value={password}
                onChange={handlePasswordChange}
                className={errorFlag ? styles.userNameError : styles.userName}
                required={true}
              />
              <label>Password</label>
              <div className={styles.iconContainer}>
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
            </div>
            {errorFlag ? (
              <div
                style={{
                  color: "red",
                  fontWeight: "bold",
                  wordWrap: "break-word", // Breaks long words to prevent overflow
                  whiteSpace: "normal", // Ensures text behaves in a standard way regarding whitespace
                  overflowWrap: "break-word", // Ensures any text exceeding the width of the container breaks onto a new line
                }}
              >
                {error}
              </div>
            ) : null}

            <SubmitButton
              submitform={handleSubmit}
              className={styles.submitButton}
              disabled={disable}
              text="Login"
            ></SubmitButton>
            <div>
              <span>Don't have an account?</span>
              <a href="/createProfile">Sign up now</a>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
