import React, { useState, useEffect } from "react";
import { riderProfileDetails } from "../../../Utils/utils";
import styles from "../Component/profileDetails.module.css";
import SubmitButton from "../../../Components/Common/SubmitButton";
const ProfileDetails = ({ profileData }) => {
  // State to hold input values
  const [riderName, setRiderName] = useState("");
  const [riderEmail, setRiderEmail] = useState("");
  const [riderPhone, setRiderPhone] = useState("");
  console.log(profileData);
  // Update state when profileData changes
  useEffect(() => {
    if (profileData) {
      setRiderName(profileData.userName || "");
      setRiderEmail(profileData.userEmail || "");
      setRiderPhone(profileData.PhoneNumber || "");
    }
  }, [profileData]);

  // Function to handle the Save button click
  const handleSave = async () => {
    await riderProfileDetails(profileData.UserId, profileData.token, {
      PhoneNumber: riderPhone,
    });
  };
  return (
    <>
      <div className={styles.riderDetailsContainer}>
        <label>Rider:</label>
        <input
          type="text"
          required={true}
          value={riderName}
          disabled={true}
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
      <div className={styles.riderDetailsContainer}>
        <label>Ratings:</label>
        <input
          type="tel" // Changed to type tel for phone number format
          disabled={true}
          value={profileData.averageRating}
          onChange={(e) => setRiderPhone(e.target.value)}
        />
      </div>
      <SubmitButton
        submitform={handleSave}
        text="Save"
        buttonStyle={styles.submitButton}
      />
    </>
  );
};

export default ProfileDetails;
