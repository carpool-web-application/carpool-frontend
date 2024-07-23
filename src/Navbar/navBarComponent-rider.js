import React, { useState} from 'react';
import '../Navbar/navBarComponent-rider.css';
import { useDispatch } from 'react-redux';
import { removeRider } from '../Slice/riderSlice';
import { Link } from 'react-router-dom';

const RiderNavBar = ({riderData}) => {
/* const storedData = localStorage.getItem('rider');
const riderData = JSON.parse(storedData); */
const riderId = riderData?.userName;
const dispatch = useDispatch();
const handleLogoutButton = () => {
  dispatch(removeRider());
}



  return (
        <div className='rider-home-navMenu' >
          <Link to='/riderHome'>Rider Home</Link>
          <Link to='/riderLogin'>Find a Ride</Link>
          <Link to='/riderpastRides'>Past Rides</Link>
          <Link to='/homePage' onClick={handleLogoutButton}>Logout</Link>
        </div>


        );
};

export default RiderNavBar;
