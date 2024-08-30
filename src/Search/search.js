import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
import PaymentComp from "../Payment/payment";
import GetClosestDriver from "./GetClosestDriver";
import emailjs from "emailjs-com";
import "./Search.css";
import RiderNavBar from "../Navbar/rider/navBarComponent-rider.js";
import GifComponent from "../Navbar/gifcomponent.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchDriverButton from "../Components/Common/SearchDriverButton.js";
import Alert from "../Components/Common/alert.js";
import MapComponent from "../Components/Common/MapComponent.js";
import ModalComponent from "../Components/Common/modalcomponent.js";

const libraries = ["places"];
const RiderFinder = () => {
  /*   const storedData = localStorage.getItem('rider');
  const parsedData? = JSON.parse(storedData); */
  const parsedData = useSelector((state) => state.rider.rider);
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  const [directions, setDirections] = useState(null);
  const [seats, setSeat] = useState("");
  const [diplayDrivers, setDisplayDrivers] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPayment, setshowPayment] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [costPerSeat, setCostPerSeat] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  if (!parsedData) {
    navigate("/login");
  }

  useEffect(() => {
    async function fetchData() {
      const existingRecord = await fetch(
        `http://localhost:9000/riderRequest/${parsedData?.userName}`
      );
      const existingRecordData = await existingRecord.json();
      if (!existingRecordData) {
        setShowButton(true);
        return;
      } else if (existingRecordData.length > 0) {
        const recordRequested = existingRecordData.filter(
          (record) => record.CommuteStatus == "Requested"
        );
        const recordPayment = existingRecordData.filter(
          (record) =>
            record.CommuteStatus == "Approved" && record.PaymentFlag == "N"
        );
        if (recordPayment.length > 0) {
          setshowPayment(true);
          return;
        }
      } else if (
        existingRecordData.CommuteStatus == "Approved" &&
        existingRecordData.PaymentFlag === "N"
      ) {
        setshowPayment(true);
        return;
      }
    }

    fetchData();
  }, [showButton, showPayment, parsedData?.userName]);

  const originRef = useRef();
  const destinationRef = useRef();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
    libraries: libraries,
  });

  if (!isLoaded) {
    return (
      <div className="loading-spinner">
        <i className="fa fa-spinner fa-spin"></i>
        <span>Loading...</span>
      </div>
    );
  }

  const onPickUpTimeChange = (event) => {
    setPickUpTime(event.target.value);
  };

  const onSeatChange = (event) => {
    setSeat(event.target.value);
  };

  const directionsCallback = (result) => {
    if (result != null) {
      setDirections(result);
    }
  };

  const calculateCost = (cost) => {
    setCostPerSeat(cost);
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

  const sendConfirmationEmail = () => {
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
  };

  const searchForRide = async () => {
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
      setTimeout(() => setIsOpen(true), 3000);

      console.log("set the flag to true");
    }
  };
  //console.log(showPayment == true)
  return (
    <div className="main-page">
      <div className="rider-search-navbar-container">
        <RiderNavBar />
        {/* <GifComponent /> */}
      </div>

      <div className="seacrh-container">
        <div className="search-container-form">
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

            {showButton === true ? (
              <SearchDriverButton searchForRide={searchForRide} />
            ) : (
              <Alert />
            )}
          </form>
        </div>
        <div className="driver-modal">
          {isOpen && (
            <ModalComponent toggleModal={toggleModal}>
              <GetClosestDriver
                startLat={origin.latProp}
                startLon={origin.lngProp}
                endLat={destination.latProp}
                endLon={destination.lngProp}
                seats={seats}
                origin={originRef.current.value}
                destination={destinationRef.current.value}
                riderID={parsedData?.userName}
              />{" "}
            </ModalComponent>
          )}
        </div>
        {/*         {diplayDrivers === true ? (
          <div>{isOpen && <ModalComponent toggleModal={toggleModal} />}</div>
        ) : null} */}
        <div className="map-container">
          <MapComponent directions={directions} />
          {showPayment === true ? (
            <div className="payment-rider">
              <PaymentComp
                cost={calculateCost}
                riderEmail="rutuja.patil17@vit.edu"
                riderUserName="riderRutuja"
              />
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiderFinder;
