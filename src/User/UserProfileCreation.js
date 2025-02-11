import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  userExits,
  createUser,
  createDriverUser,
  createRiderUser,
} from "../Utils/Signup/SignUp";
import styles from "./ProfileCreation.module.css";

const ProfileCreation = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setrePassword] = useState("");
  const [driverName, setdriverName] = useState("");
  const [email, setEmail] = useState("");
  const [commuterType, setcommuterType] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showLoginButton, setShowLoginButton] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlerePasswordChange = (event) => {
    setrePassword(event.target.value);
  };

  const handledriverNameChange = (event) => {
    setdriverName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlecommuterTypeChange = (event) => {
    setcommuterType(event.target.value);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (event) => {
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

    event.preventDefault();
    let postDriver = false;
    let postRider = false;
    const existingRecord = await userExits(username);
    const existingRecordData = await existingRecord.json();
    // Filter the results based on the username field

    // const recordExists = existingRecordData.some(record => record.userName === username || record.userPassword === password );
    let payload;
    if (existingRecordData) {
      alert("Record with same username already exists! Lets loginnnnn");
      setShowLoginButton(true);
      navigate("/login");
      return;
    } else {
      try {
        const userPayload = {
          userName: username,
          userPassword: password,
          userEmail: email,
          commuterType: commuterType,
        };
        const response = await createUser(userPayload);
        payload = await response.json();
        if (response.ok) {
          // alert("Profile Created!")
          if (commuterType === "Rider") {
            postRider = true;
          } else {
            postDriver = true;
          }
        } else {
          setError("There was an error creating your profile.");
        }
      } catch (error) {
        console.error(error);
        setError("There was an error creating your profile.");
      }

      if (postDriver === true) {
        try {
          const driverPayload = {
            DriverId: payload.UserId,
            DriverName: name,
            DriverEmail: email,
            DriverUserName: username,
            ratings: 0,
          };
          const response = await createDriverUser(driverPayload);
          if (response.ok) {
            postDriver = false;
          } else {
            setError("There was an error creating your driver profile.");
          }
        } catch (error) {
          console.error(error);
          setError("There was an error creating your driver profile.");
        }
      } else if (postRider === true) {
        try {
          const riderPayload = {
            RiderId: payload.UserId,
            RiderName: name,
            RiderEmail: email,
            RiderUserName: username,
            ratings: 0,
          };
          const response = await createRiderUser(riderPayload);
          if (response.ok) {
            // alert(" Rider Profile Created!")
            postRider = false;
          } else {
            setError("There was an error creating your rider profile.");
          }
        } catch (error) {
          console.error(error);
          setError("There was an error creating your rider profile.");
        }
      }
    }

    // Submit the form
    alert("Sign up successfull!");
    navigate("/login");
  };

  return (
    <div className={styles.registerParentContainer}>
      <div className={styles.registerContainer}>
        <form className={styles.signUpForm}>
          <div className={styles.inputLabelContainer}>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              autoFocus={true}
              required={true}
              placeholder="Email"
            />
            <label>Email Address</label>
          </div>

          <div className={styles.inputLabelContainer}>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              autoFocus={true}
              required={true}
              placeholder="Username"
            />
            <label>User Name</label>
          </div>

          <div className={styles.inputLabelContainer}>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              autoFocus={true}
              required={true}
              placeholder="name"
            />
            <label>Name</label>
          </div>

          <div className={styles.inputLabelContainer}>
            <input
              required={true}
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
            <label>Password</label>
          </div>

          <div className={styles.selector}>
            <select
              id="commuterType"
              name="commuterType"
              value={commuterType}
              onChange={handlecommuterTypeChange}
            >
              <option value="">Select</option>
              <option value="Rider">Rider</option>
              <option value="Driver">Driver</option>
            </select>
          </div>

          <div className={styles.registerButton}>
            <button type="submit" onClick={handleSubmit}>
              CREATE PROFILE
            </button>
          </div>

          <a href="/login" className="login">
            LET'S LOG YOU IN..
          </a>
        </form>
      </div>
    </div>
  );
};

export default ProfileCreation;
