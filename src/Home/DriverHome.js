import React, { useState,useEffect} from 'react';
import * as firebase from '../Config/firebase-config.js';
import {ref , uploadBytes , getDownloadURL } from "firebase/storage"
import '../Home/DriverHome.css';
import DriverNavBar from '../Navbar/navBarComponent-driver.js';
import GifComponent from '../Navbar/gifcomponent.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const libraries = ['places'];
const DriverRide = () => {
/*  const storedData = localStorage.getItem('driver');
  const driverData = JSON.parse(storedData); */
  
  const driverData = useSelector(state => state.driver.driver);

  const driverId = driverData?.userName;
  const [profileData,setProfileData] = useState([]);
  const [rating,setsetRating] = useState(0);
  const [error,setError] = useState('');
  const [rate, setRate] = useState(0);
  const [imageUrl, setImageUrl] = useState(''); 
  const navigate = useNavigate();
  if(!driverData) {
    navigate('/login');
  }
   useEffect( () => {

    showProfileInformation();
  }, []); 

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const imageRef = ref(firebase.storage,`${driverData._id}/${driverData._id}_profile_image`);
    uploadBytes(imageRef,file).then((image) => {
      getDownloadURL(image.ref).then((downloadURL) => {
        setImageUrl(downloadURL);
        console.log(downloadURL);
      }).catch((error) => {
        console.error('Error getting download URL:', error);
      });
    }).catch((error) => {
      console.error('Error uploading image:', error);
    });
    /* 
     const fileRef = storageRef.child(`${driverId}/${driverId}_profile_image`);
    await fileRef.put(file);
    const imageUrl = await fileRef.getDownloadURL();
    setImageUrl(imageUrl); */
  };

  const handleClick = () => {
    document.getElementById('fileInput').click();
  };
 
  const showProfileInformation = async () => {

    

    try {
      const response = await fetch(`http://localhost:9000/drivers/${driverId}`);
      if (response.ok) {

        try {
          const userImageRef = await ref(firebase.storage, `${driverData._id}/${driverData._id}_profile_image`);
          const url = await getDownloadURL(userImageRef);
          setImageUrl(url);
        } catch (error) {
          if (error.code === 'storage/object-not-found') {
            //console.error('Profile image not found:', error.message);
            setImageUrl('https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg');
          } else {
            //console.error('Error fetching profile image:', error);
            setImageUrl('https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg');
          }
        }

        const data = await response.json();
        setProfileData(data);


        const ratings = data.ratings; // Use the updated data from response.json()
        if (ratings.length > 0) {
          const sum = ratings.reduce((acc, rating) => acc + rating, 0);
          const average = sum / ratings.length;
          console.log('Average rating:', average);
          setsetRating(average);
        } else {
          setsetRating(0);
        }
      } else {
        setError('Failed to fetch profile data');
      }
    } catch (error) {
      setError('Failed to fetch profile data');
    }
  };
  
  return (
    <div className='rider-home-main-page'>
{/*       <div className='driver-home-navMenu' >
        <a href='/driverHome'>Driver Home</a> &nbsp; &nbsp;
        <a href='/driverLogin'>Post a Ride</a> &nbsp; &nbsp;
        <a href='/pastRides'>Past Rides</a> &nbsp; &nbsp;
        <a href='/driverApproval'>Request Approval</a> &nbsp; &nbsp;
        <a href='/homePage'>Logout</a>
      </div> */}
      <DriverNavBar driver = {driverData}/>
      <GifComponent/>
      

{/*       <div className='driver-home-gif-container'>
        <img className="driver-home-gif-carpool" src="https://www.jojobrt.com/wp-content/uploads/2022/02/attuare_progetto_carpooling_PSCL.gif" alt="bgimg"/>
      </div> */}
      <div className= 'driver-profle-container'>           
        <div className="driver-card">
          <div className = "driver-profile-image-container">
            <div className = "driver-profile-image">
              <img  src={imageUrl} alt="John" /> 
            </div>
            <div className='driver-profile-container'>
                <input type="file" id="fileInput" onChange={handleImageUpload} style={{ display: 'none' }} />
                <button className='driver-profile-button' onClick={handleClick}>Upload Image</button>
            </div>
          </div>
          <div className='driver-profile-details'>
            <div className="title">
            <p className='title'> Driver: &nbsp;

            {profileData?.DriverName}
            </p>
            
            <p className='title'> Email:&nbsp; 

            {profileData?.DriverEmail}
            </p>
            
            <p className='title'> Ratings : 
            {profileData?.ratings}

            </p>
            
            </div>
          </div>

        
        </div>
      </div>


    </div>



  );
};

export default DriverRide;