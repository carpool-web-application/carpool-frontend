import React, { useState, useEffect } from "react";

const ProfileDetails = ({ profileData }) => {
  // State to hold input values
  const [riderName, setRiderName] = useState("");
  const [riderEmail, setRiderEmail] = useState("");
  const [riderPhone, setRiderPhone] = useState("");

  // Update state when profileData changes
  useEffect(() => {
    if (profileData) {
      setRiderName(profileData.RiderName || "");
      setRiderEmail(profileData.RiderEmail || "");
      setRiderPhone(profileData.RiderPhone || "");
    }
  }, [profileData]);

  // Function to handle the Save button click
  const handleSave = () => {
    const apiURL = "https://api.yourdomain.com/profile/update"; // Replace with your actual API URL

    fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add other necessary headers such as Authorization if needed
      },
      body: JSON.stringify({
        RiderName: riderName,
        RiderEmail: riderEmail,
        RiderPhone: riderPhone,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Profile updated successfully:", data);
        // Handle success here (e.g., display a success message)
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        // Handle errors here (e.g., display an error message)
      });
  };
  return (
    <>
      <div>
        Rider:
        <input
          type="text"
          required={true}
          value={riderName}
          onChange={(e) => setRiderName(e.target.value)}
        />
      </div>
      <div>
        Email:
        <input
          type="email" // Changed to type email for better input validation
          required={true}
          value={riderEmail}
          onChange={(e) => setRiderEmail(e.target.value)}
        />
      </div>
      <div>
        Phone Number:
        <input
          type="tel" // Changed to type tel for phone number format
          required={true}
          value={riderPhone}
          onChange={(e) => setRiderPhone(e.target.value)}
        />
      </div>
      <div>Ratings: {profileData.ratings}</div>
      <button onClick={handleSave}>Save</button>
    </>
  );
};

export default ProfileDetails;
