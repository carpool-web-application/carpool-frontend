import React, { useState, useEffect } from "react";
import "./RiderHome.css";
import * as firebase from "../../Config/firebase-config.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import RiderNavBar from "../../Navbar/rider/navBarComponent-rider.js";
import ProfilePicture from "./Component/ProfilePicture.js";
import { useSelector } from "react-redux";
import ProfileDetails from "../Rider/Component/ProfileDetails.js";
import { getRiderDetails } from "../../Utils/utils.js";
import Loader from "../../loaderComponent/Loader.js";

const Rider = () => {
  /*    const storedData = localStorage.getItem('rider');
  const driverData = JSON.parse(storedData); */
  const driverData = useSelector((state) => state.rider.rider);
  const driverId = driverData.userId;
  const [profileData, setProfileData] = useState([]);
  const [rating, setsetRating] = useState(0);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [load, setLoad] = useState(true);

  const showProfileInformation = async () => {
    try {
      const response = await getRiderDetails(driverId, driverData.token);
      if (response.ok) {
        const data = await response.json();
        setProfileData({ ...data, token: driverData.token });
        try {
          const userImageRef = await ref(
            firebase.storage,
            `${driverId}/${driverId}_profile_image`
          );
          const url = await getDownloadURL(userImageRef);
          setImageUrl(url);
        } catch (error) {
          if (error.code === "storage/object-not-found") {
            setImageUrl(
              "https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
            );
          } else {
            setImageUrl(
              "https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
            );
          }
        }
        const ratings = data.ratings; // Use the updated data from response.json()
        if (ratings.length > 0) {
          const sum = ratings.reduce((acc, rating) => acc + rating, 0);
          const average = sum / ratings.length;
          setsetRating(average);
        } else {
          setsetRating(0);
        }
        setLoad((prev) => !prev);
      } else {
        setError("Failed to fetch profile data");
      }
    } catch (error) {
      setError("Failed to fetch profile data");
    }
  };

  useEffect(() => {
    showProfileInformation();
  }, []);

  const handleImageUpload = async (data) => {
    const imageRef = ref(
      firebase.storage,
      `${driverId}/${driverId}_profile_image`
    );
    uploadBytes(imageRef, data)
      .then((image) => {
        getDownloadURL(image.ref)
          .then((downloadURL) => {
            setImageUrl(downloadURL);
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

  return (
    <div className="rider-home-main-page">
      <RiderNavBar />

      {load ? (
        <div
          style={{
            display: "flex", // Use flexbox to center the child component
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
            height: "100vh", // Make the div take the full height of the viewport
          }}
        >
          <Loader />
        </div>
      ) : (
        <div className="rider-profle-container">
          <div className="rider-card">
            <ProfilePicture
              imageUrl={imageUrl}
              handleClick={handleClick}
              handleImageUpload={handleImageUpload}
            />

            <div className="rider-profile-details">
              <ProfileDetails profileData={profileData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rider;
