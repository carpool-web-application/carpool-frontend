import React, { useState, useEffect } from "react";
import { riderProfileDetails } from "../../../Utils/utils";
import styles from "../Component/driverprofileDetails.module.css";
const DriverProfileDetails = ({ profileData }) => {
  // State to hold input values
  const [driverName, setDriverName] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [driverPhone, setDriverPhone] = useState("");

  console.log(profileData);
  // Update state when profileData changes
  useEffect(() => {
    if (profileData) {
      setDriverName(profileData.DriverName || "");
      setDriverEmail(profileData.DriverEmail || "");
      setDriverPhone(profileData.DriverPhone || "");
    }
  }, [profileData]);

  // Function to handle the Save button click
  const handleSave = async () => {
    const updateUser = await riderProfileDetails();
  };
  return (
    <>
      <div className={styles.riderDetailsContainer}>
        <label>Rider:</label>
        <input
          type="text"
          required={true}
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
        />
      </div>
      <div className={styles.riderDetailsContainer}>
        <label>Email:</label>
        <input
          type="email" // Changed to type email for better input validation
          required={true}
          value={driverEmail}
          onChange={(e) => setDriverEmail(e.target.value)}
        />
      </div>
      <div className={styles.riderDetailsContainer}>
        <label>Phone Number:</label>
        <input
          type="tel" // Changed to type tel for phone number format
          required={true}
          value={driverPhone}
          onChange={(e) => setDriverPhone(e.target.value)}
        />
      </div>
      <div className={styles.riderRatingContainer}>
        <label>Ratings:</label> {profileData.ratings}
      </div>
      <button onClick={handleSave}>Save</button>
    </>
  );
};

export default DriverProfileDetails;
