import React, { useState, useEffect } from "react";
import { riderProfileDetails } from "../../../Utils/utils";
import styles from "../Component/profileDetails.module.css";
const ProfileDetails = ({ profileData }) => {
  // State to hold input values
  const [riderName, setRiderName] = useState("");
  const [riderEmail, setRiderEmail] = useState("");
  const [riderPhone, setRiderPhone] = useState("");
  console.log(profileData);
  // Update state when profileData changes
  useEffect(() => {
    if (profileData) {
      setRiderName(profileData.RiderName || "");
      setRiderEmail(profileData.RiderEmail || "");
      setRiderPhone(profileData.RiderPhone || "");
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
          value={riderName}
          onChange={(e) => setRiderName(e.target.value)}
        />
      </div>
      <div className={styles.riderDetailsContainer}>
        <label>Email:</label>
        <input
          type="email" // Changed to type email for better input validation
          required={true}
          value={riderEmail}
          onChange={(e) => setRiderEmail(e.target.value)}
        />
      </div>
      <div className={styles.riderDetailsContainer}>
        <label>Phone Number:</label>
        <input
          type="tel" // Changed to type tel for phone number format
          required={true}
          value={riderPhone}
          onChange={(e) => setRiderPhone(e.target.value)}
        />
      </div>
      <div className={styles.riderRatingContainer}>
        <label>Ratings:</label> {profileData.ratings}
      </div>
      <button onClick={handleSave}>Save</button>
    </>
  );
};

export default ProfileDetails;
