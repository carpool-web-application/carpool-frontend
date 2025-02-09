import React, { useState, useEffect } from "react";

const ClosestCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [dropOffLocations, setDropOffLocations] = useState([]);
  const [currentPickUpIndex, setCurrentPickUpIndex] = useState(0);
  const [currentDropOffIndex, setCurrentDropOffIndex] = useState(0);

  useEffect(() => {
    // Fetch customers data
    fetch("http://localhost:9000/riderOrders/")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error fetching customers data:", error));

    // Fetch drop-off locations data
    fetch("http://localhost:9000/riderOrders/")
      .then((response) => response.json())
      .then((data) => setDropOffLocations(data))
      .catch((error) =>
        console.error("Error fetching drop-off locations data:", error)
      );
  }, []);
  //console.log(customers);
  //console.log('drop off' +dropOffLocations);
  const currentPickUp = customers[currentPickUpIndex];
  const currentDropOff = dropOffLocations[currentDropOffIndex];

  const handleNextPickUp = () => {
    if (currentPickUpIndex < customers.length - 1) {
      setCurrentPickUpIndex(currentPickUpIndex + 1);
    } else {
      alert("All customers have been picked up!");
    }
  };

  const handleNextDropOff = () => {
    if (currentPickUpIndex == customers.length - 1) {
    if (currentDropOffIndex < dropOffLocations.length - 1) {
      setCurrentDropOffIndex(currentDropOffIndex + 1);
    }   else {
        alert("All drop-off locations have been reached!");
      } } else if (currentPickUpIndex < customers.length - 1) {
        alert("finish the pick up");
    }
    

  };

  return (
    
    <div>
      <h2>Closest Customer to Pick Up:</h2>
      {currentPickUp && (
        <div>
          <p>{currentPickUp.name}</p>
          <p>
            Latitude: {currentPickUp.OriginLatitude}, Longitude: {currentPickUp.OriginLongitude}
          </p>
          <button onClick={handleNextPickUp}>Next Pick Up</button>
        </div>
      )}
      <h2>Current Drop Off Location:</h2>
      {currentDropOff && (
        <div>
          <p>
            Drop Off Location {currentDropOff.id}: Latitude: {currentDropOff.DestinationLatitude},{" "}
            Longitude: {currentDropOff.DestinationLongitude}
          </p>
          <button onClick={handleNextDropOff}>Next Drop Off</button>
        </div>
      )}
    </div>
  );
};

export default ClosestCustomers;
