import React, { useEffect, useState } from 'react';
import '../Navbar/navBarComponent-driver.css';
import { useDispatch } from 'react-redux';
import { removeDriver } from '../Slice/driverSlice';
import { teardownConnection , messageSocket } from '../Slice/socketSlice'; 
import { Link } from 'react-router-dom';
import {socket} from './Navbar';

const DriverNavBar = ({ driver }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [message, setMessage] = useState();
  const dispatch = useDispatch();

  const handleLogoutButton = (event) => {
      // Prevent default link behavior to handle logout programmatically
    //dispatch(teardownConnection());  // Dispatch action to disconnect the socket
    dispatch(removeDriver());  // Dispatch action to remove driver data
    // Optionally navigate to a different page programmatically if needed
  }

/*   useEffect(() => {
    dispatch(messageSocket());
  },[dispatch]); */



  useEffect(() => {
    const socketListener = socket.on('approval_notification', (notificationData) => {
      // Handle the notification data received from the server
      setMessage(notificationData); // Update message state with received data
      // Increment notification count
      setNotificationCount((prevCount) => prevCount + 1);
      // You can update the UI, show a notification, or perform any other action here
    });
  }, []); // Run this effect only once when the component mounts

  console.log(notificationCount);
  console.log(message);

  return (
        <div className='driver-navMenu' >
          <Link to='/driverHome'>Driver Home</Link>
          <Link to='/driverLogin'>Post a Ride</Link> 
          <Link to='/pastRides'>Past Rides</Link> 
          <Link to='/driverApproval'>Request Approval</Link> 
          <Link to='/homePage' onClick={handleLogoutButton}>Logout</Link>
        </div>


        );
};

export default DriverNavBar;
