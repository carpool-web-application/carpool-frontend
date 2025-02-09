import React, { useState, useEffect, useRef } from "react";
import * as firebase from "../../../Config/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const DriverProfilePicture = ({ imageUrl, handleClick, handleImageUpload }) => {
  const [error, setError] = useState("");

  const onClickImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const handleUpload = (e) => {
    handleClick();
  };

  return (
    <div className="driver-profile-image-container">
      <div className="driver-profile-image">
        <img src={imageUrl} alt="John" />
      </div>
      <div className="driver-profile-container">
        <input
          type="file"
          id="fileInput"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        <button className="driver-profile-button" onClick={handleClick}>
          Upload Image
        </button>
      </div>
    </div>
  );
};
export default DriverProfilePicture;
