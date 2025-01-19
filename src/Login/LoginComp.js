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
    setDisable((prev) => (prev = true));
    const payload = {
      userName: username,
      userPassword: password,
    };
    const existingRecordResponse = await login(payload);
    if (!existingRecordResponse.ok) {
      return (
        <div className="alert">
          <span className="closebtn">&times;</span>
          <strong>OOps! Authentication Issues Suspected. </strong>
        </div>
      );
    }
    const existingRecordData = await existingRecordResponse.json();
    console.log("existing record data ---->", existingRecordData);
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

  return (
    <div className={styles.loginparentcontainer}>
      <nav className={styles.navBar}>
        <span>Carpool!!!</span>
      </nav>
      <MainWrapper>
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
            <TextInput
              key="password"
              type="password"
              value={password}
              onchange={handlePasswordChange}
              className={styles.userName}
              required={true}
              placeholder="Password"
            />

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
      </MainWrapper>
    </div>
  );
};

export default Login;
