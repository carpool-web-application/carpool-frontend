//importing scss files,image and react so that code can be written using their functions

import React, { useState ,useEffect } from 'react';
import RiderItems from './riderItems.js'

const  DriverOrderitems = (props) => {
const [rideRequest,setRideRequest] = useState([]);
const [showRide,setShowRide] = useState(false);
const [error,setError] = useState('');
  //Using usestate to assign classes based on the click of the reminder name to expand reduce the size of the remidner. It also strikes the reminder if it complete

  useEffect(() => {
  


    showRideInformation();
  },[]) 
  
  const  showRideInformation =  async () => {
  try {
    const response = await fetch(`http://localhost:9000/riderOrders/driver/${props.orders}`);
    if (response.ok) {
    const data = await response.json();
     if(Array.isArray(data)) {
      
      const filteredDrivers = data.filter(item =>
        item.CommuteStatus == 'Approved' &&
        item.DriverId ==  props.driverid // Change column5 to the desired column for filtering
      );
      
      setRideRequest(filteredDrivers);
     }
     else if( data.CommuteStatus == 'Approved' && data.DriverId ==  props.driverid){

      setRideRequest(data);
      console.log(data);
     }


    } else {
      setError('Failed to fetch profile data');
    }
  } catch (error) {
    setError('Failed to fetch profile data');
  }

};


  const handleAcceptRider = async () => {
    if (props.status == 'Open') {
      fetch(`http://localhost:9000/riderOrders/${props.driverid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ DriverPostStatus: 'Completed'}) // set the new status based on the checkbox value
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


        /* props.removeRequest(props.driverid) */
        if(rideRequest.length === 0) {
          console.log("asdasd")
          console.log(rideRequest)
        }
/*         fetch(`http://localhost:9000/riderOrders/${props.driverid}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          })
            .then(response => {
              if (!response.ok) {
                
                throw new Error('Failed to delete reminder status');
              }
              // update the checkbox state in the component's state
              //setCheckBox(checked);
              //props.removeRequest(props.riderId)

            })
            .catch(error => {
              console.error(error);
              // handle the error
            });

            setShowRide(false);
            console.log(rideRequest); */
            
  }
 

  const rideRequestData = Array.isArray(rideRequest) && rideRequest.map(c =>(
    <RiderItems 
    key = {c._id}
    //driverid = {driverId}
    riderId = {c.RiderId} 
    origin = {c.StartingLocation}
    destination = {c.Destination}
    driverorderNumbmer = {c.DriverOrderNumber}
    riderorderNumbmer = {c.RiderOrderNumber}
    status = {c.CommuteStatus}
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
  <div className='driver-details' >
    <p className="driver-name"> Hello {props.driverid}, below are your drive details : </p>
    <p className="driver-name"> {props.origin}</p>
    <p className="driver-name"> {props.destination}</p>
    <p className="driver-name" onClick={displayRiders}> {props.orders} is your order number.</p>
  <button className='acceptbtn' onClick={handleAcceptRider}>Complete the ride</button>
  <button className='rejectbtn' onClick={handleRejectRider}>Delete the Ride</button>

  { <div>
    ((props.status == 'Completed') ? ({rideRequestData}): null)
    </div>
   
  }
  </div>


);
};



export default DriverOrderitems;