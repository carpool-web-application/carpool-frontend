import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userExits, createUser } from "../Utils/Signup/SignUp";
import styles from "./ProfileCreation.module.css";

const ProfileCreation = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [vehcileMake, setvehcileMake] = useState("");
  const [vehcileModel, setvehcileModel] = useState("");
  const [vehcileYear, setvehcileYear] = useState("");
  const [vehcilePlate, setvehcilePlate] = useState("");
  const [licenseNumber, setlicenseNumber] = useState("");
  const [email, setEmail] = useState("");
  const [commuterType, setcommuterType] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showDriverInput, setDhowDriverInput] = useState(false);
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

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlecommuterTypeChange = (event) => {
    setcommuterType(event.target.value);
    if (event.target.value === "Driver") {
      setDhowDriverInput(true);
    } else setDhowDriverInput(false);
  };

  const handleLicenseNumberChange = (event) => {
    setlicenseNumber(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleVehcileMakeChange = (event) => {
    setvehcileMake(event.target.value);
  };

  const handleVehcileModelChange = (event) => {
    setvehcileModel(event.target.value);
  };
  const handleVehcileyearChange = (event) => {
    setvehcileYear(event.target.value);
  };
  const handleVehcilePlateNumberChange = (event) => {
    setvehcilePlate(event.target.value);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (event) => {
    if (!email || !username || !password || !phoneNumber) {
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
      handleLogin();
      return;
    } else {
      try {
        const userPayload =
          commuterType === "Rider"
            ? {
                userName: username,
                userPassword: password,
                userEmail: email,
                commuterType: commuterType,
                PhoneNumber: phoneNumber,
              }
            : {
                userName: username,
                userPassword: password,
                userEmail: email,
                commuterType: commuterType,
                PhoneNumber: phoneNumber,
                driverDetails: {
                  licenseNumber: licenseNumber,
                  vehicle: {
                    make: vehcileMake,
                    model: vehcileModel,
                    year: vehcileYear,
                    plateNumber: vehcilePlate,
                  },
                },
              };
        const response = await createUser(userPayload);
        payload = await response.json();
        if (!response.ok) {
          console.error("There was an error creating your profile.");
        }
      } catch (error) {
        console.error(error);
        setError("There was an error creating your profile.");
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
          <div className={styles.inputDiv}>
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
            <div className={styles.inputLabelContainer}>
              <input
                required={true}
                type="text"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Phone Number"
              />
              <label>Phone Number</label>
            </div>
            {showDriverInput ? (
              <>
                <div className={styles.inputLabelContainer}>
                  <input
                    required={true}
                    type="text"
                    value={licenseNumber}
                    onChange={handleLicenseNumberChange}
                    placeholder="License Number"
                  />
                  <label>License Number</label>
                </div>
                <div className={styles.inputLabelContainer}>
                  <input
                    required={true}
                    type="text"
                    value={vehcileMake}
                    onChange={handleVehcileMakeChange}
                    placeholder="Vehicle Make"
                  />
                  <label>Vehicle Make</label>
                </div>
                <div className={styles.inputLabelContainer}>
                  <input
                    required={true}
                    type="text"
                    value={vehcileModel}
                    onChange={handleVehcileModelChange}
                    placeholder="Vehicle Model"
                  />
                  <label>Vehicle Model</label>
                </div>
                <div className={styles.inputLabelContainer}>
                  <input
                    required={true}
                    type="text"
                    value={vehcileYear}
                    onChange={handleVehcileyearChange}
                    placeholder="Vehicle year"
                  />
                  <label>Vehicle year</label>
                </div>
                <div className={styles.inputLabelContainer}>
                  <input
                    required={true}
                    type="text"
                    value={vehcilePlate}
                    onChange={handleVehcilePlateNumberChange}
                    placeholder="Vehicle Plate Number"
                  />
                  <label>Vehicle Plate Number</label>
                </div>
              </>
            ) : (
              <></>
            )}
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
          <div className={styles.inputLabelContainer}>
            <a href="/login" className="login">
              LET'S LOG YOU IN..
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileCreation;
