//importing scss files,image and react so that code can be written using their functions

import React, { useState ,useEffect } from 'react';
import DriverItems from './driverItems.js'
import './riderOrderItems.css';

const  RiderOrderitems = (props) => {
const [rideRequest,setRideRequest] = useState([]);
const [showRide,setShowRide] = useState(false);
const [error,setError] = useState('');
  //Using usestate to assign classes based on the click of the reminder name to expand reduce the size of the remidner. It also strikes the reminder if it complete
  
  useEffect(() => {
    showRideInformation();
  },[])
  
  const showRideInformation = async () => {
    try {
      const response = await fetch(`http://localhost:9000/riderOrders/driver/${props.driverorders}`);
      if (response.ok) {
      const data = await response.json();
       
       if(Array.isArray(data)) {
        const filteredDrivers = data.filter(item =>
          item.DriverPostStatus == 'Completed' &&
          item.DriverId ==  props.driverid // Change column5 to the desired column for filtering
        );
        setRideRequest(filteredDrivers);
       }
       else if( data.DriverPostStatus == 'Completed' && data.DriverId ==  props.driverid){
        setRideRequest(data);
        
       }

      } else {
        setError('Failed to fetch profile data');
      }
    } catch (error) {
      setError('Failed to fetch profile data');
    }
  };


  const handleAcceptRider = async () => {
    if (props.status !== 'Completed') {
      fetch(`http://localhost:9000/riderOrders/${props.driverid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ CommuteStatus: 'Completed'}) // set the new status based on the checkbox value
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update reminder status');
          }
          // update the checkbox state in the component's state
          //setCheckBox(checked);
          //props.removeRequest(props.riderId)
        })
        .catch(error => {
          console.error(error);
          // handle the error
        });
    }
    else {
      alert('The Ride is already completed')
    }
    
      
  }

  const handleRejectRider = async() => {

        props.removeRequest(props.driverid)

  }
 

  const rideRequestData = Array.isArray(rideRequest) && rideRequest.map(c =>(
    <DriverItems 
    key = {c._id}
    driverid = {c.DriverId}
    //riderId = {c.RiderId} 
    origin = {c.StartingLocation}
    destination = {c.Destination}
    driverorderNumbmer = {c.DriverOrderNumber}
    //riderorderNumbmer = {c.RiderOrderNumber}
    status = {c.DriverPostStatus}
    RatingFlag = {c.RatingFlag}
    //passing the function remove Reminder to the reminde items
    />)
  ); 


  const displayRiders = async () => {
   
      if (showRide === true) {
        setShowRide(false);
      }
      else {
        setShowRide(true);
      }
   

  }
//a return function with all the div where all the container will load which is existing or created
return (
  <div className='rider-past-details' >
    <p className="rider-order-name"> Hello {props.riderId}, below are your ride details : </p>
    <p className="rider-order-name"> $ {props.cost}</p>
    <p className="rider-order-name"> {props.destination}</p>
      
  <div>
  {rideRequestData}
  </div>
  
  </div>


);
};



export default RiderOrderitems;