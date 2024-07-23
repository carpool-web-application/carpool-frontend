import React from "react";

// Driver component representing a driver with start and end locations
const Driver = ({ name, startLat, startLon, endLat, endLon }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Start Location: {startLat}, {startLon}</p>
      <p>End Location: {endLat}, {endLon}</p>
    </div>
  );
};

export default Driver;
