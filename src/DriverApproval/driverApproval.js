import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import RideRequestItems from "../rideRequestItems/rideRequestItems.js";
import { fetchRequestedRide, rejectRide } from "../Utils/ride.js";
import styles from "./DriverApproval.module.css";

const Driverapproval = () => {
  /*   const storedData = localStorage.getItem('driver');
  const driverData? = JSON.parse(storedData); */
  const driverData = useSelector((state) => state.user.userData);
  const driverId = driverData?.userId;
  const [rideRequest, setRideRequest] = useState([]);
  const [driverOrders, setDriverOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {}, []);

  const fetchInitialData = async () => {
    showRequestedRide();
    showDriverOrderInformation();
  };

  const showRequestedRide = async () => {
    try {
      const responseData = await fetchRequestedRide(
        driverId,
        driverData?.token
      );

      if (!responseData.ok) {
      }

      const response = await responseData.json();
      setRideRequest(response);
    } catch (error) {
      setError("Failed to fetch profile data");
    }
  };

  const showDriverOrderInformation = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/riderOrders/${driverId}`
      );
      if (response.ok) {
        const orderdata = await response.json();
        // console.log(data)
        if (Array.isArray(orderdata)) {
          const filteredDriverOrder = orderdata.filter(
            (item) =>
              item.DriverPostStatus === "Open" && item.DriverId === driverId // Change column5 to the desired column for filtering
          );
          if (filteredDriverOrder.Availableseats == 0) {
            fetch(`http://localhost:9000/riderOrders/${driverId}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ DriverPostStatus: "Closed" }), // set the new status based on the checkbox value
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Failed to update reminder status");
                }
                // update the checkbox state in the component's state
                //setCheckBox(checked);
              })
              .catch((error) => {
                console.error(error);
                // handle the error
              });
          } else {
            setDriverOrders(filteredDriverOrder);
          }
        } else if (
          orderdata.DriverPostStatus === "Open" &&
          orderdata.DriverId === driverId
        ) {
          setDriverOrders(orderdata);
        }
      } else {
        setError("Failed to fetch profile data");
      }
    } catch (error) {
      setError("Failed to fetch profile data");
    }
  };

  const removeRequest = async (requestId, body) => {
    try {
      const responseData = await rejectRide(requestId, body, driverData?.token);

      if (!responseData.ok) {
        // Handle error if the response is not OK, e.g., throw an error or set an error state
        throw new Error("Failed to reject ride");
      }

      const response = await responseData.json();

      // Update the state by filtering out the request with the specified requestId
      setRideRequest((prevRequests) => {
        return prevRequests.filter(
          (prevRequest) => prevRequest.requestId !== requestId
        );
      });
    } catch (error) {
      console.error("Error rejecting ride:", error);
      // Optionally update state to reflect the error
    }
  };

  const data =
    Array.isArray(rideRequest) &&
    rideRequest.map((c) => (
      <RideRequestItems
        key={c._id}
        userName={c.RiderId}
        removeRequest={removeRequest}
        setDriverOrders={driverOrders}
        riderseats={c.Riderseats}
        avaialableseats={driverOrders.Availableseats}
        //passing the function remove Reminder to the reminde items
      />
    ));

  return (
    <div className={styles.approvalMain}>
      <div className="data-area">{data}</div>
    </div>
  );
};

export default Driverapproval;
