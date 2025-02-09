import React, { useState, useEffect } from "react";
import * as firebase from "../../Config/firebase-config.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../Driver/DriverHome.css";
import DriverNavBar from "../../Navbar/driver/navBarComponent-driver.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { driverDetails } from "../../Utils/utils.js";
import DriverProfilePicture from "../Driver/Component/DriverProfilePicture.js";
import DriverProfileDetails from "../Driver/Component/DriverProfileDetails.js";
const DriverRide = () => {
  /*  const storedData = localStorage.getItem('driver');
  const driverData = JSON.parse(storedData); */

  const driverData = useSelector((state) => state.driver.driver);
  const driverId = driverData?.userId;
  const [profileData, setProfileData] = useState([]);
  const [rating, setsetRating] = useState(0);
  const [error, setError] = useState("");
  const [rate, setRate] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  if (!driverData) {
    navigate("/login");
  }
  useEffect(() => {
    showProfileInformation();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const imageRef = ref(
      firebase.storage,
      `${driverId}/${driverId}_profile_image`
    );
    uploadBytes(imageRef, file)
      .then((image) => {
        getDownloadURL(image.ref)
          .then((downloadURL) => {
            setImageUrl(downloadURL);
            console.log(downloadURL);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  const showProfileInformation = async () => {
    try {
      const response = await driverDetails(driverId, driverData.token);
      if (response.ok) {
        try {
          const userImageRef = await ref(
            firebase.storage,
            `${driverId}/${driverId}_profile_image`
          );
          const url = await getDownloadURL(userImageRef);
          setImageUrl(url);
        } catch (error) {
          if (error.code === "storage/object-not-found") {
            //console.error('Profile image not found:', error.message);
            setImageUrl(
              "https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
            );
          } else {
            //console.error('Error fetching profile image:', error);
            setImageUrl(
              "https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
            );
          }
        }

        const data = await response.json();
        setProfileData(data);

        const ratings = data.ratings; // Use the updated data from response.json()
        if (ratings.length > 0) {
          const sum = ratings.reduce((acc, rating) => acc + rating, 0);
          const average = sum / ratings.length;
          console.log("Average rating:", average);
          setsetRating(average);
        } else {
          setsetRating(0);
        }
      } else {
        setError("Failed to fetch profile data");
      }
    } catch (error) {
      setError("Failed to fetch profile data");
    }
  };

  return (
    <div className="rider-home-main-page">
      <DriverNavBar driver={driverData} />
      <div className="driver-profle-container">
        <div className="driver-card">
          <DriverProfilePicture
            imageUrl={imageUrl}
            handleClick={handleClick}
            handleImageUpload={handleImageUpload}
          />
          <div className="driver-profile-details">
            <DriverProfileDetails profileData={profileData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverRide;
