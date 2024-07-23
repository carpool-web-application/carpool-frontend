import React,  {useEffect, useState} from 'react';
import { distanceMatrix } from '@googlemaps/google-maps-services-js';



const NearestDriver = ({riderLocation, driverData}) =>{
    const [nearestDriver, setNearestDriver] = useState(null);
console.log("INSIDE RIDE MATCH COMPONENT");
    useEffect(() => {
    const getNearestDriver = async () => {
      const distances = await Promise.all(
        driverData.map(async (driver) => {
          const response = await distanceMatrix({
            origins: [riderLocation],
            destinations: [driver.location],
            key: 'AIzaSyBaE0BFCbpDBdN5NkUK2DA-2Jm7IRnoGZg',
          }).asPromise();
          return {
            driver,
            distance: response.json.rows[0].elements[0].distance.value,
          };
        })
      );
      const sortedDistances = distances.sort(
        (a, b) => a.distance - b.distance
      );

      setNearestDriver(sortedDistances[0].driver);
      console.log(nearestDriver);
    };

    getNearestDriver();
  }, [riderLocation, driverData]);

  if (!nearestDriver) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>Nearest Driver:</h2>
      <p>Name: {nearestDriver.name}</p>
      <p>Location: {nearestDriver.location}</p>
      
   {/*  <button onClick={() => handleBookDriver(nearestDriver)}>Book Driver</button>*/ }
    </div>
  );
};

export default NearestDriver;