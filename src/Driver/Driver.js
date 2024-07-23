import React, { useState,useEffect } from 'react';




const Driver = () => {
  /* const [rideRequests, setRideRequests] = useState([]);


  const populateRequests = async () => {
    try {
      const response = await fetch('http://localhost:9000/riders/');
      const riderData = await response.json();
      console.log("Rider Data at Driver side", riderData);
    }
    catch(error){
      console.error(error);
    }
  }
  
  useEffect(() => {
    populateRequests();
  }, []);

  const acceptRequest = (request) => {
    // Logic for accepting a ride request goes here
    console.log(`Accepted ride request from ${request.origin} to ${request.destination}`);
    setRideRequests(rideRequests.filter((r) => r !== request));
  };

  const rejectRequest = (request) => {
    // Logic for rejecting a ride request goes here
    console.log(`Rejected ride request from ${request.origin} to ${request.destination}`);
    setRideRequests(rideRequests.filter((r) => r !== request));
  }; */
  
  return (
    <div>
{/*       <h1>Ride Requests:</h1>
      {rideRequests.length > 0 ? (
        rideRequests.map((request, index) => (
          <div key={index}>
            <p>{`From: ${request.origin}`}</p>
            <p>{`To: ${request.destination}`}</p>
            <button onClick={() => acceptRequest(request)}>Accept</button>
            <button onClick={() => rejectRequest(request)}>Reject</button>
          </div>
        ))
      ) : (
        <p> {rideRequests} </p>
      )} */}
      <h1>hello</h1>
    </div>
  );
};

export default Driver;
