import React, { useState, useEffect } from "react";
import './GetClosestDriver.css';
import PaymentComp from '../Payment/payment';
import { useNavigate } from "react-router-dom";
//import ClosestCustomer from "./closestCustomer";

// Function to calculate the Haversine distance between two points
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(deltaPhi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const GetClosestDriver =  (props) => {
  const navigate = useNavigate();
  //console.log(props.origin)
  const [closestDriver, setClosestDriver] = useState('');
  const [paymentComp, setPaymentComp] = useState('');
 
   useEffect(() => {
    fetchDrivers(props.startLat, props.startLon, props.endLat, props.endLon);
    
  }, []); 
  

 
  const fetchDrivers = async (userStartLat, userStartLon, userEndLat, userEndLon) => {
    try {
      const response = await fetch("http://localhost:9000/riderOrders/"); // Replace with actual API endpoint to fetch drivers
      if (!response.ok) {
        throw new Error("Failed to fetch drivers");
      }
      const drivers = await response.json();
      
      ////console.log(drivers);
      //const filteredDrivers = drivers;
      const filteredDrivers = drivers.filter(item =>
        item.DriverPostStatus == 'Open' &&  // Change column1 to the desired column for filtering
        item.Availableseats > 0  &&
        item.Availableseats > props.seats  // Change column5 to the desired column for filtering
      );
      //const closestdriver = getClosestDriver(userStartLat, userStartLon, userEndLat, userEndLon, drivers);
      let ClosestDriver = null;
      let minDistance = 5; // Initialize with a very large value
      filteredDrivers.forEach(driver => {
          // Extract driver and user location coordinates from their addresses
          const startDistance = haversine(userStartLat, userStartLon, driver.OriginLatitude, driver.OriginLongitude);
          const endDistance = haversine(userEndLat, userEndLon, driver.DestinationLatitude, driver.DestinationLongitude);
          const totalDistance = startDistance + endDistance;
          //console.log(startDistance);
          console.log('booelen' + totalDistance);
          console.log(totalDistance < minDistance);
          if (totalDistance < minDistance) {
            minDistance = totalDistance;
            ClosestDriver = driver;
          }
      });
      setClosestDriver(ClosestDriver);
    } catch (error) {
      console.error(error);
    }
  }
  //fetchDrivers(props.startLat, props.startLon, props.endLat, props.endLon);
  const getClosestDriver = async (userStartLat, userStartLon, userEndLat, userEndLon, drivers) => {
    let ClosestDriver = null;
    let minDistance = 5; // Initialize with a very large value
    drivers.forEach(driver => {
        // Extract driver and user location coordinates from their addresses
        const startDistance = haversine(userStartLat, userStartLon, driver.OriginLatitude, driver.OriginLongitude);
        const endDistance = haversine(userEndLat, userEndLon, driver.DestinationLatitude, driver.DestinationLongitude);
        const totalDistance = startDistance + endDistance;
        ////console.log(startDistance);

        if (totalDistance < minDistance) {
          minDistance = totalDistance;
          ClosestDriver = driver;
        }
    });




/*     for (const driver of drivers) {
      const startDistance = haversine(userStartLat, userStartLon, driver.OriginLatitude, driver.OriginLongitude);
      const endDistance = haversine(userEndLat, userEndLon, driver.DestinationLatitude, driver.DestinationLongitude);
      const totalDistance = startDistance + endDistance;
      if (totalDistance < 1) {
        minDistance = totalDistance;
        ClosestDriver = driver;
        ////console.log('sdas')
      }
    } */

    return ClosestDriver;
  }

 

  function showPopup() {
    window.open('/payment', 'Payment Popup', 'width=500,height=500');
    return false;
  }

  const handlesendRequsttoDriver = async () => {
    //setPaymentComp(true);
    navigate('/riderHome');
    alert("Request Sent!");
    const newOrderNumber = Math.floor(Math.random() * 1000000000).toString();
    const existingRecord = await fetch(`http://localhost:9000/riderRequest/${props.riderID}`);
    const existingRecordData = await existingRecord.json();
    // Filter the results based on the username field
    if (!existingRecordData) {
      //console.error('existingRecordData is null or undefined');
      try {
        const response = await fetch(`http://localhost:9000/riderRequest/`, { //fetch api with the call back function
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            riderOrderNumber: newOrderNumber,
            DriverOrderNumber: closestDriver.DriverOrderNumber ,
            DriverId: closestDriver.DriverId,
            RiderId: props.riderID,
            OriginLatitude: props.startLat ,
            OriginLongitude: props.startLon,
            DestinationLatitude: props.endLat,
            DestinationLongitude: props.endLon,
            Riderseats: props.seats,
            StartingLocation: props.origin,
            Destination: props.destination,
            Cost: ((closestDriver.Cost/closestDriver.driverseats)*props.seats),
            CommuteStatus:"Requested"}),
        });
        const responsedata = await response.json();
        ////console.log(responsedata);
  
      } catch (error) {
        console.error(error);
      }
    }
    else {
      if (existingRecordData.length>0) {
        const recordExists = existingRecordData.filter(record => record.CommuterStatus == 'Requested' && record.DriverOrderNumber == closestDriver.DriverOrderNumber);
        if (recordExists.length>0) {
          alert('You have already requested');
          return;
         
          }
          else {
            try {
              const response = await fetch(`http://localhost:9000/riderRequest/${props.riderID}`, { //fetch api with the call back function
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  riderOrderNumber: newOrderNumber,
                  DriverOrderNumber: closestDriver.DriverOrderNumber ,
                  DriverId: closestDriver.DriverId,
                  RiderId: props.riderID,
                  OriginLatitude: props.startLat ,
                  OriginLongitude: props.startLon,
                  DestinationLatitude: props.endLat,
                  DestinationLongitude: props.endLon,
                  Riderseats: props.seats,
                  Cost: ((closestDriver.Cost/closestDriver.driverseats)*props.seats),
                  CommuteStatus:"Requested"}),
              });
              const responsedata = await response.json();
              ////console.log(responsedata);
        
            } catch (error) {
              console.error(error);
            }
      } 
    }
      /* else if (existingRecordData.CommuterStatus == 'Requested' && existingRecordData.DriverOrderNumber == closestDriver.DriverOrderNumber){

      }
    //console.log(recordExists)
    if (recordExists.length>0) {
    alert('You have already requested');
    return;
   
    }
    else {
      try {
        const response = await fetch(`http://localhost:9000/riderRequest/${props.riderID}`, { //fetch api with the call back function
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            riderOrderNumber: closestDriver.DriverOrderNumber,
            DriverOrderNumber: newOrderNumber,
            DriverId: closestDriver.driverId,
            RiderId: props.riderID,
            OriginLatitude: props.startLat ,
            OriginLongitude: props.startLon,
            DestinationLatitude: props.endLat,
            DestinationLongitude: props.endLon,
            Riderseats: props.seats,
            CommuteStatus:"Requested"}),
        });
        const responsedata = await response.json();
        ////console.log(responsedata);
  
      } catch (error) {
        console.error(error);
      }
    } */
    }
   
    
  }
  return (
    <div className="main_driver" >
    {closestDriver ? (
<div className="driver-det" >
<details>
    <summary>Driver Found!</summary>
    <p>Closest Driver Available : {closestDriver.DriverId}</p>
        <p> Driver Order Number : {closestDriver.DriverOrderNumber}</p>
        <p>Total Cost : $ {((closestDriver.Cost/closestDriver.driverseats)*props.seats)}</p>
        <div>
        <button className="req" type="submit" onClick={handlesendRequsttoDriver}>REQUEST</button>
        </div>   
</details>
</div>
    ) : 
    (
      <div className="search-alert">
      <div className="alert">
      <span className="closebtn">&times;</span>  
      <strong>Sorry! No drivers heading your ride Destination. Please try again later OR change the Destination.</strong>
    
    {/*JUST FOR WOKRING ..DELETE LATER */}
    
      

    </div> 
  <div className="PAYMENT">
      
    <PaymentComp/> 
      
   </div> 
    </div>
    )}
    {/* <ClosestCustomer/> */}


{/*payment*/}



{paymentComp ? (
 // <div className="payment">
 //     { <a  href="/payment" onClick={showPopup}>
  //      Confirm the seat! Let's complete the Payment....
  //    </a> }
  <div className="payment">
    <PaymentComp/>
    </div>
    ) : (
      <p></p>
    )}
  
  </div>

  );
}

export default GetClosestDriver;
