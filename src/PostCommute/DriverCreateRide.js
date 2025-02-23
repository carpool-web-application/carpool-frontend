import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import styles from "./CreateRide.module.css";
import DriverNavBar from "../Navbar/driver/navBarComponent-driver.js";
import { useSelector } from "react-redux";
import { fetchOngoingRide, createRide } from "../Utils/ride.js";
import SubmitButton from "../Components/Common/SubmitButton.js";
const libraries = ["places"];
const DriverRide = () => {
  const parsedData = useSelector((state) => state.driver.driver);
  const navigate = useNavigate();
  const [data, setData] = useState({
    DriverOrderNumber: "",
    DriverId: "",
    StartingLocation: "",
    Destination: "",
    DriverPostStatus: "Open",
    Seats: "",
    Cost: "",
    OriginLatitude: "",
    OriginLongitude: "",
    DestinationLatitude: "",
    DestinationLongitude: "",
  });
  const [originLat, setOriginLat] = useState(0);
  const [originLng, setOriginLng] = useState(0);
  const [destinationLat, setDestinationLat] = useState(0);
  const [destinationLng, setDestinationLng] = useState(0);
  const [pickUpTime, setPickUpTime] = useState("");
  const [directions, setDirections] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [cost, setCost] = useState(0);
  const [seats, setSeats] = useState(0);
  const [showPayment, setshowPayment] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState("");

  const handleSeatsChange = (e) => {
    setSeats(e.target.value);
  };

  const handleCostChange = (e) => {
    if (e.target.value !== 0) {
      setCost(e.target.value);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    /*    try { */
    const existingRecord = await fetchOngoingRide(
      parsedData.id,
      parsedData.token
    );
    if (!existingRecord.ok) {
      setShowButton(true);
    } else {
      setError("Failed to fetch profile data");
    }
    /*   } catch (error) {
 setError('Failed to fetch profile data');
} */
  };

  /** @type React.MutableRefObject<HTMLInputElement>*/
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement>*/
  const destinationRef = useRef();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
    libraries: libraries,
  });

  if (!isLoaded) {
    return <div>loading......</div>;
  }
  const handleGeocodeLocation = async (location) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.REACT_APP_GOOGLE_API}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;
        const locationObject = { latProp: lat, lngProp: lng };
        //console.log(locationObject.latProp)
        return locationObject;
      } else {
        setErrorMessage("Error while requesting geocoding API");
      }
    } catch (error) {
      setErrorMessage("Error while requesting geocoding API");
    }
  };

  const PostRide = async () => {
    const origin = await handleGeocodeLocation(originRef.current.value);
    const destination = await handleGeocodeLocation(
      destinationRef.current.value
    );

    try {
      const ridePayload = {
        driver: parsedData.id, // Assuming this is an ObjectId from the "userAuths" collection
        StartingLocation: originRef.current.value,
        Destination: destinationRef.current.value,
        status: "available",
        Cost: cost,
        OriginLatitude: origin.latProp,
        OriginLongitude: origin.lngProp,
        DestinationLatitude: destination.latProp,
        DestinationLongitude: destination.lngProp,
        Availableseats: seats,
      };
      const responseData = await createRide(ridePayload, parsedData.token);
      if (!responseData.ok) {
        console.error("Failed to create the Post");
      }
      const response = responseData.json();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    /*     try {
      const response = await fetch("http://localhost:9000/riderOrders/", {
        //fetch api with the call back function
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          DriverOrderNumber: newOrderNumber,
          DriverId: driverId,
          StartingLocation: originRef.current.value,
          Destination: destinationRef.current.value,
          OriginLatitude: origin.latProp,
          OriginLongitude: origin.lngProp,
          DestinationLatitude: destination.latProp,
          DestinationLongitude: destination.lngProp,
          driverseats: data.Seats,
          Availableseats: data.Seats,
          Cost: data.Cost,
          DriverPostStatus: "Open",
        }),
      });
      const responsedata = await response.json();
      console.log(responsedata);
    } catch (error) {
      console.error(error);
    } */
    /*     setData({
      DriverOrderNumber: "",
      DriverId: "",
      StartingLocation: "",
      Destination: "",
      Status: "Open",
      Seats: "",
      Cost: "",
      OriginLatitude: "",
      OriginLongitude: "",
      DestinationLatitude: "",
      DestinationLongitude: "",
    });
    originRef.current.value = "";
    destinationRef.current.value = ""; */
    //navigate("/driverHome");
  };

  return (
    <div className={styles.createPageContainer}>
      <DriverNavBar driver={parsedData} />
      <div className={styles.addRideContainer}>
        <div className={styles.loginFormContainer}>
          <form className={styles.loginForm}>
            <div className={styles.inputContainer}>
              <Autocomplete className={styles.inputContainer}>
                <input
                  id="StartingLocation"
                  type="text"
                  name="StartingLocation"
                  ref={originRef}
                  className={styles.inputbox}
                  autoFocus={true}
                  required={true}
                />
              </Autocomplete>
              <label>From?</label>
            </div>
            <div className={styles.inputContainer}>
              <Autocomplete className={styles.inputContainer}>
                <input
                  id="Destination"
                  type="text"
                  name="StartingLocation"
                  ref={destinationRef}
                  className={styles.inputbox}
                  autoFocus={true}
                  required={true}
                  placeholder="To?"
                />
              </Autocomplete>
              <label>To?</label>
            </div>
            <div className={styles.inputContainer}>
              <input
                id="seats"
                placeholder="Seats"
                value={seats}
                name="seats"
                onChange={handleSeatsChange}
                className={styles.inputbox}
              />
              <label>Seats</label>
            </div>
            <div className={styles.inputContainer}>
              <input
                id="cost"
                placeholder="Cost"
                value={cost}
                name="Cost"
                onChange={handleCostChange}
                className={styles.inputbox}
              />
              <label>Cost</label>
            </div>
            {showButton === true ? (
              <div className={styles.inputContainer}>
                <SubmitButton
                  submitform={PostRide}
                  className={styles.submitButton}
                  text="Create the Ride"
                ></SubmitButton>
              </div>
            ) : (
              <div className={styles.alert}>
                <span classNamee={styles.closebtn}>&times;</span>
                <strong>Hold on!</strong> Complete the previous Ride to start
                one!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriverRide;
