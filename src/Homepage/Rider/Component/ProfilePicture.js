import React, { useState, useEffect, useRef } from "react";
import * as firebase from "../../../Config/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProfilePicture = ({ imageUrl, handleClick, handleImageUpload }) => {
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
    <div className="rider-profile-image-container">
      <div className="rider-profile-image">
        <img src={imageUrl} alt="John" />
      </div>

      <div className="rider-profile-container">
        <input
          type="file"
          id="fileInput"
          onChange={onClickImageUpload}
          style={{ display: "none" }}
        />
        <button className="rider-profile-button" onClick={handleUpload}>
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default ProfilePicture;
