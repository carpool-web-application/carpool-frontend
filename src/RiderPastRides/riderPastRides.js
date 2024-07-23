import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RiderPastOrders from "./riderOrderitems.js";
import "./riderPastRides.css";
import RiderNavBar from "../Navbar/navBarComponent-rider.js";
import GifComponent from "../Navbar/gifcomponent.js";

const RiderPastRides = () => {
  /* const storedData = localStorage.getItem('rider'); */
  const driverData = useSelector((state) => state.rider.rider);
  const driverId = driverData?.userName;
  const [riderOrders, setRiderOrders] = useState([]);
  const [rating, setsetRating] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!driverData) {
    navigate("/login");
  }

  useEffect(() => {
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
      const response = await fetch(`http://localhost:9000/riderRequest/`);
      if (response.ok) {
        const orderdata = await response.json();

        if (Array.isArray(orderdata)) {
          const filteredDriverOrder = orderdata.filter(
            (item) =>
              item.DriverPostStatus !== "Cancelled" && item.RiderId == driverId // Change column5 to the desired column for filtering
          );
          //console.log(filteredDriverOrder)
          setRiderOrders(filteredDriverOrder);
        } else if (
          orderdata.DriverPostStatus !== "Cancelled" &&
          orderdata.RiderId == driverId
        ) {
          setRiderOrders(orderdata);
        } else {
          setError("Failed to data");
        }
      }
    } catch (error) {
      setError("Failed to fetch profile data");
    }
  };

  const removeRequest = (riderID) => {
    setRiderOrders(
      riderOrders.filter((rideRequests) => rideRequests.RiderId !== riderID)
    );
    fetch(`http://localhost:9000/riderRequest/${riderID}`, {
      //fetch api with the call back function
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete reminder status");
        } else {
          console.log("Successfully deleted");
        }
      })
      .catch((error) => {
        console.error(error);
        // handle the error
      });
  };

  /*   const rideRequestData = Array.isArray(rideRequest) && rideRequest.map(c =>(
    <RideRequestItems 
    key = {c._id}
    userName = {c.RiderId}
    removeRequest = {removeRequest} 
    setRiderOrders = {riderOrders}
    riderseats = {c.Riderseats}
    avaialableseats = {riderOrders.Availableseats}
    //passing the function remove Reminder to the reminde items
    />)
  ); */

  const DriverOrderData =
    Array.isArray(riderOrders) &&
    riderOrders.map((c) => (
      <RiderPastOrders
        key={c._id}
        driverid={c.DriverId}
        riderId={driverId}
        removeRequest={removeRequest}
        origin={c.StartingLocation}
        destination={c.Destination}
        driverorders={c.DriverOrderNumber}
        riderorders={c.RiderOrderNumber}
        status={c.CommuteStatus}
        cost={c.Cost}
        //passing the function remove Reminder to the reminde items
      />
    ));
  return (
    <div className="rider-past-rides-container">
      <div className="rider-past-rider-navbar-container">
        <GifComponent />
      </div>

      <div className="grid-conatiner-view-riders">{DriverOrderData}</div>
    </div>
  );
};

export default RiderPastRides;
