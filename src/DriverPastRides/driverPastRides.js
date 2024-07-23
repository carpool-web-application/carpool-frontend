import React, { useState,useEffect , useRef } from 'react';
import { Link } from 'react-router-dom';
import DriverPastOrders from './driverOrderitems.js';
import './driverOrderItems.css';
import './driverPastRides.css';
import DriverNavBar from '../Navbar/navBarComponent-driver.js';
import GifComponent from '../Navbar/gifcomponent.js';
import { useSelector } from 'react-redux';

const DriverPastRides = () => {
/*   const storedData = localStorage.getItem('driver');
  const driverData = JSON.parse(storedData); */
  const driverData = useSelector(state => state.driver.driver);
  const driverId = driverData.userName; 
  const [driverOrders,setDriverOrders] = useState([]);
  const [rating,setsetRating] = useState(0);
  const [error,setError] = useState('');
  

   useEffect( () => {
    //showRideInformation();
    showCommuterInformation();
  }, []); 
 
/*   const showRideInformation = async () => {
    try {
      const response = await fetch(`http://localhost:9000/riderRequest/`);
      if (response.ok) {
        const data = await response.json();
       // console.log(data)
        const filteredDrivers = data.filter(item =>
            item.CommuteStatus === 'Approved' &&
            item.DriverId ===  driverId // Change column5 to the desired column for filtering
          );
        setRideRequest(filteredDrivers);
      } else {
        setError('Failed to fetch profile data');
      }
    } catch (error) {
      setError('Failed to fetch profile data');
    }
  }; */
  const showCommuterInformation = async () => {
    try {
      console.log(driverData);
      const response = await fetch(`http://localhost:9000/riderOrders/${driverId}`);
      if (response.ok) {
     const orderdata = await response.json();
      // console.log(orderdata)
        const filteredDriverOrder = orderdata.filter(item =>
            item.DriverPostStatus !== 'Cancelled' &&
            item.CommuteStatus !== null

          ); 
          setDriverOrders(filteredDriverOrder);         
      } else {
        setError('Failed to data');
      }
    } catch (error) {
      setError('Failed to fetch profile data');
    }
  };

  const removeRequest = (driverID) => {
    setDriverOrders(driverOrders.filter((rideRequests) => rideRequests.DriverId !== driverID));
    fetch(`http://localhost:9000/riderRequest/${driverID}`, {  //fetch api with the call back function
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete reminder status');
      }
      else {
        
        console.log('Successfully deleted');
      }
    })
    .catch(error => {
      console.error(error);
      // handle the error
    });
  }

/*   const rideRequestData = Array.isArray(rideRequest) && rideRequest.map(c =>(
    <RideRequestItems 
    key = {c._id}
    userName = {c.RiderId}
    removeRequest = {removeRequest} 
    setDriverOrders = {driverOrders}
    riderseats = {c.Riderseats}
    avaialableseats = {driverOrders.Availableseats}
    //passing the function remove Reminder to the reminde items
    />)
  ); */

  const DriverOrderData = Array.isArray(driverOrders) && driverOrders.map(c =>(
    <DriverPastOrders 
    key = {c._id}
    driverid = {c.DriverId}
    //riderId = {c.RiderId}
    removeRequest = {removeRequest} 
    origin = {c.StartingLocation}
    destination = {c.Destination}
    orders = {c.DriverOrderNumber}
    status = {c.DriverPostStatus}
    //passing the function remove Reminder to the reminde items
    />)
  );
  return (
    <div >
                <DriverNavBar driver={driverData}/>
                <GifComponent/>
        <div className='grid-conatiner-view-drivers'>
        {DriverOrderData}
        </div>

    </div>
  );
};

export default DriverPastRides;