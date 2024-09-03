import React, { useState, useRef, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import TextInput from "../Common/TextInput";
import SearchDriverButton from "../Common/SearchDriverButton";

const DriverSearch = ({ showButton, setDirectionCall, openModal }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  /* const [directions, setDirections] = useState(null); */
  const [seats, setSeat] = useState("");
  const [costPerSeat, setCostPerSeat] = useState(0);
  const [diplayDrivers, setDisplayDrivers] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const originRef = useRef();
  const destinationRef = useRef();

  const onPickUpTimeChange = (event) => {
    setPickUpTime(event.target.value);
  };

  const onSeatChange = (event) => {
    setSeat(event.target.value);
  };

  const directionsCallback = (result) => {
    if (result != null) {
      /* setDirections(result); */
      setDirectionCall(result);
    }
  };

  const calculateCost = (cost) => {
    setCostPerSeat(cost);
  };

  const searchForRide = async (event) => {
    event.preventDefault();
    const origincord = await handleGeocodeLocation(originRef.current.value);

    const destinationcord = await handleGeocodeLocation(
      destinationRef.current.value
    );
    if (
      originRef.current.value &&
      destinationRef.current.value &&
      pickUpTime &&
      seats
    ) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: originRef.current.value,
          destination: destinationRef.current.value,
          travelMode: "DRIVING",
        },
        directionsCallback
      );
      setOrigin(origincord);
      setDestination(destinationcord);
      setDisplayDrivers(true);
      setTimeout(() => openModal(true), 3000);

      console.log("set the flag to true");
    }
  };

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

  /*   const sendConfirmationEmail = () => {
    const templateID = "template_a34i9to";
    const serviceID = "service_ei1jycj";
    const userID = "O25MTvtRdtBmJjw3S77ib";

    emailjs
      .send(serviceID, templateID, userID)
      .then((response) => {
        console.log("Email sent:", response.text);
      })
      .catch((error) => {
        console.error("Email error:", error);
      });
  }; */

  return (
    <form className="search-login-form">
      <p className="search-login-text">
        <span className="fa-stack fa-lg">
          <i className="fa fa-circle fa-stack-2x"></i>
          <i className="fa fa-lock fa-stack-1x"></i>
        </span>
      </p>
      <Autocomplete>
        <input
          id="origin"
          type="text"
          name="Origin"
          ref={originRef}
          className="login-username"
          autoFocus={true}
          required={true}
          placeholder="From?"
        />
      </Autocomplete>

      <Autocomplete>
        <input
          id="destination"
          type="text"
          name="Destination"
          ref={destinationRef}
          className="login-username"
          autoFocus={true}
          required={true}
          placeholder="Where to?"
        />
      </Autocomplete>

      <input
        className="login-username"
        required={true}
        id="pickUpTime"
        type="datetime-local"
        value={pickUpTime}
        onChange={onPickUpTimeChange}
        placeholder="Time Please! "
      />

      <input
        id="seats"
        type="number"
        value={seats}
        onChange={onSeatChange}
        className="login-username"
      />

      {showButton === true ? <SearchDriverButton /> : SearchDriverButton}
    </form>
  );
};

export default DriverSearch;
