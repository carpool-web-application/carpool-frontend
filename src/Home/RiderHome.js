import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./RiderHome.css";
import * as firebase from "../Config/firebase-config.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import RiderNavBar from "../Navbar/navBarComponent-rider.js";
import GifComponent from "../Navbar/gifcomponent.js";
import { useSelector } from "react-redux";

const libraries = ["places"];
const Rider = () => {
  /*    const storedData = localStorage.getItem('rider');
  const driverData = JSON.parse(storedData); */
  const driverData = useSelector((state) => state.rider.rider);
  const driverId = driverData.userName;
  const [profileData, setProfileData] = useState([]);
  const [rating, setsetRating] = useState(0);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    showProfileInformation();
  }, []);

  const showProfileInformation = async () => {
    try {
      const response = await fetch(`http://localhost:9000/riders/${driverId}`);
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        /*         const userImage =  await ref(firebase.storage,`${driverData._id}/${driverData._id}_profile_image`);
        const url = await getDownloadURL(userImage);
        console.log(url);
        if(url) {
          setImageUrl(url);
        }
        else {
          
        } */

        try {
          const userImageRef = await ref(
            firebase.storage,
            `${driverData._id}/${driverData._id}_profile_image`
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

        const ratings = data.ratings; // Use the updated data from response.json()
        if (ratings.length > 0) {
          const sum = ratings.reduce((acc, rating) => acc + rating, 0);
          const average = sum / ratings.length;
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const imageRef = ref(
      firebase.storage,
      `${driverData._id}/${driverData._id}_profile_image`
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
    /* 
     const fileRef = storageRef.child(`${driverId}/${driverId}_profile_image`);
    await fileRef.put(file);
    const imageUrl = await fileRef.getDownloadURL();
    setImageUrl(imageUrl); */
  };

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="rider-home-main-page">
      {/*         <div className='rider-home-navMenu' >
          <a href='/riderHome'>Rider Home</a> &nbsp; &nbsp;
          <a href='/riderLogin'>Find a Ride</a> &nbsp; &nbsp;
          <a href='/riderpastRides'>Past Rides</a> &nbsp; &nbsp;
          <a href='/homePage'>Logout</a>
        </div>
        <div className='rider-home-gif-container'>
          <img className="rider-home-gif-carpool" src="https://www.jojobrt.com/wp-content/uploads/2022/02/attuare_progetto_carpooling_PSCL.gif"/>
        </div> */}
      <RiderNavBar />
      <GifComponent />
      <div className="rider-profle-container">
        <div className="rider-card">
          <div className="rider-profile-image-container">
            <div className="rider-profile-image">
              <img src={imageUrl} alt="John" />
            </div>

            <div className="rider-profile-container">
              <input
                type="file"
                id="fileInput"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <button className="rider-profile-button" onClick={handleClick}>
                Upload Image
              </button>
            </div>
          </div>

          <div className="rider-profile-details">
            <p className="title">
              Rider: &nbsp;
              {profileData.RiderName}
              <p className="title">
                {" "}
                Email: &nbsp;
                {profileData.RiderEmail}
              </p>
              <p className="title">
                {" "}
                Ratings: &nbsp;
                {profileData.ratings}
              </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rider;
