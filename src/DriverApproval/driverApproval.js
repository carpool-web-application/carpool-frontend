import React, { useState,useEffect , useRef } from 'react';
import RideRequestItems from '../rideRequestItems/rideRequestItems.js';
import { useSelector } from 'react-redux';
import '../DriverApproval/DriverApproval.css'
import DriverNavBar from '../Navbar/navBarComponent-driver.js';
import GifComponent from '../Navbar/gifcomponent.js';
import {socket} from '../Navbar/Navbar';


const Driverapproval = () => {
/*   const storedData = localStorage.getItem('driver');
  const driverData? = JSON.parse(storedData); */
  const driverData = useSelector(state => state.driver.driver);
  const driverId = driverData?.userName; 
  const [rideRequest,setRideRequest] = useState([]);
  const [driverOrders,setDriverOrders] = useState([]);
  const [rating,setsetRating] = useState(0);
  const [error,setError] = useState('');
  

/*    useEffect( () => {
    showProfileInformation();
    showDriverOrderInformation();
  }, []); 
  */

  useEffect(() => {
    fetchInitialData();

    socket.on('approval_notification', (notificationData) => {
      // Handle the notification data received from the server
      fetchInitialData();
      // You can update the UI, show a notification, or perform any other action here
    });

    return () => {
      socket.off('newRideRequest');
    };
  }, [driverId]);

  const fetchInitialData = async () => {
    showProfileInformation();
    showDriverOrderInformation();
  };

  const showProfileInformation = async () => {
    try {
      const response = await fetch(`http://localhost:9000/riderRequest/`);
      if (response.ok) {
        const data = await response.json();
       // console.log(data)
        const filteredDrivers = data.filter(item =>
            item.CommuteStatus === 'Requested' &&
            item.DriverId ===  driverId  // Change column5 to the desired column for filtering
          );
        setRideRequest(filteredDrivers);
      } else {
        setError('Failed to fetch profile data');
      }
    } catch (error) {
      setError('Failed to fetch profile data');
    }
  };

  const showDriverOrderInformation = async () => {
    try {
      const response = await fetch(`http://localhost:9000/riderOrders/${driverId}`);
      if (response.ok) {
        const orderdata = await response.json();
       // console.log(data)
       if(Array.isArray(orderdata)) {
        const filteredDriverOrder = orderdata.filter(item =>
          item.DriverPostStatus === 'Open' &&
          item.DriverId ===  driverId  // Change column5 to the desired column for filtering
        );
        if (filteredDriverOrder.Availableseats == 0) {
          fetch(`http://localhost:9000/riderOrders/${driverId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ DriverPostStatus: 'Closed'}) // set the new status based on the checkbox value
        })
       

        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update reminder status');
          }
          // update the checkbox state in the component's state
          //setCheckBox(checked);
        })
        .catch(error => {
          console.error(error);
          // handle the error
        });
          } else {
            setDriverOrders(filteredDriverOrder);
          }
        }
        else if (orderdata.DriverPostStatus === 'Open' && orderdata.DriverId ===  driverId)    {
          setDriverOrders(orderdata);
        }
      } else {
        setError('Failed to fetch profile data');
      }
    } catch (error) {
      setError('Failed to fetch profile data');
    }
  };

  const removeRequest = (riderId) => {
    setRideRequest(rideRequest.filter((rideRequests) => rideRequests.RiderId !== riderId));
  fetch(`http://localhost:9000/riderRequest/${riderId}`, {  //fetch api with the call back function
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

  const data = Array.isArray(rideRequest) && rideRequest.map(c =>(
    <RideRequestItems 
    key = {c._id}
    userName = {c.RiderId}
    removeRequest = {removeRequest} 
    setDriverOrders = {driverOrders}
    riderseats = {c.Riderseats}
    avaialableseats = {driverOrders.Availableseats}
    //passing the function remove Reminder to the reminde items
    />)
  );

  return (
    <div className='driver-approval-page'>
      <div className='driver-approval-page-navarea'>      
        <DriverNavBar driver = {driverData}/>
        <GifComponent/>
      </div>

{/*         <div className="alert">
                <span className="closebtn">&times;</span>  
                <strong>Hey, {driverId} </strong> You have a Ride Request !
        </div> */}
          
      <div className='data-area'>
        {data}
      </div>

    </div>
  );
};

export default Driverapproval;