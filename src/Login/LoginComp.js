import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./Component/LoginForm.js";
import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { storeDriver } from "../Slice/driverSlice";
import { storeRider } from "../Slice/riderSlice.js";
import TextInput from "../Components/Common/TextInput.js";
import SubmitButton from "../Components/Common/SubmitButton.js";
/* import { setupConnection } from '../Slice/socketSlice'; */

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [commuterStatus, setCommuterStatus] = useState("");
  const [error, setError] = useState("");
  const [riderLoginButton, setRiderLoginButton] = useState(false);
  const [driverLoginButton, setDriverLoginButton] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /*   useEffect(() => {
      // Dispatch the setupConnection action to establish the socket connection
      dispatch(setupConnection());
  }, []); */

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
    //validations

    navigate("/driverLogin");
  };

  const handleSubmit = async () => {
    if (!email || !username || !password) {
      alert("Please fill out all fields.");
      return;
    }

    // Check if the email address is valid
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");

      return;
    }

    // Submit the form

    //console.log(username)

    const existingRecordResponse = await fetch(
      `http://localhost:9000/userAuths/${username}`
    );
    const existingRecordData = await existingRecordResponse.json();
    console.log(existingRecordData);
    //const recordExists = existingRecordData.some(record => record.userName === username || record.userEmail === email );
    if (!username || !password) {
      alert("All fields are required.");
      return;
    }

    // existingRecordData.forEach(record =>{
    if (existingRecordData) {
      if (
        existingRecordData.userName == username &&
        existingRecordData.userPassword == password
      ) {
        if (existingRecordData.commuterType === "Rider") {
          setRiderLoginButton(true);
          //localStorage.setItem('rider', JSON.stringify(existingRecordData));
          dispatch(storeRider(existingRecordData));
          navigate("/riderLogin");
          return;
        } else if (existingRecordData.commuterType === "Driver") {
          setDriverLoginButton(true);
          //localStorage.setItem('driver', JSON.stringify(existingRecordData))
          dispatch(storeDriver(existingRecordData));
          //connect();
          //dispatch(setConnected(true));
          //disconnect();
          /* setupConnection(); */
          navigate("/driverLogin");
          return;
        } else {
          <div className="alert">
            <span className="closebtn">&times;</span>
            <strong>OOps! Authentication Issues Suspected. </strong>
          </div>;
        }
      }
    } else {
      <div className="alert">
        <span className="closebtn">&times;</span>
        <strong>OOps! Authentication Issues Suspected. </strong>
      </div>;
    }

    // })
  };

  return (
    <div className={styles.loginparentcontainer}>
      <nav className={styles.navBar}>
        <span>Carpool!!!</span>
      </nav>
      <div className={styles.formContainer}>
        <LoginForm className={styles.loginForm}>
          {/*           <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="login-username"
            autoFocus={true}
            required={true}
            placeholder="Email"
          /> */}
          <span>Login to enjoy offers while riding</span>
          <TextInput
            key="email"
            type="email"
            value={email}
            onchange={handleEmailChange}
            className={styles.userName}
            autoFocus={true}
            required={true}
            placeholder="Email"
          />
          {/*           <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className="login-username"
            autoFocus={true}
            required={true}
            placeholder="Username"
          /> */}
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
          {/*           <input
            className="login-password"
            required={true}
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          /> */}

          <div>
            <span>Don't have an account?</span>
            <a href="/createProfile">Sign up now</a>
          </div>
          {/*           <button
            type="button"
            onClick={handleSubmit}
            name="Login"
            value="LOG IN"
            className="login-login-submit"
          >
            {" "}
            LOG IN{" "}
          </button> */}
          <SubmitButton
            submitform={handleSubmit}
            className={styles.submitButton}
          ></SubmitButton>
        </LoginForm>
      </div>

      {/* 

          <a href="#" className="loginn-forgot-pass">forgot password?</a> */}

      {/* <div className="login-underlay-photo"></div> */}
      {/* <div className="login-underlay-black"></div> */}
    </div>
  );
};

export default Login;
