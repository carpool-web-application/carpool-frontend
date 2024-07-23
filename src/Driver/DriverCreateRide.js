import React, { useState,useEffect , useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useJsApiLoader ,Autocomplete } from '@react-google-maps/api';
import './DriverCreateRide.css';
import DriverNavBar from '../Navbar/navBarComponent-driver.js';
import GifComponent from '../Navbar/gifcomponent.js';
import { useSelector } from 'react-redux';

const libraries = ['places'];
const DriverRide = () => {
/*   const storedData = localStorage.getItem('driver'); 
  const parsedData = JSON.parse(storedData);*/
  const parsedData = useSelector(state => state.driver.driver);
  console.log(parsedData);
  const navigate = useNavigate();
  const driverId = parsedData?.userName;
  const [data, setData] = useState(
    {DriverOrderNumber: '',
      DriverId:'',
      StartingLocation: '',
      Destination: '',
      DriverPostStatus: 'Open',
      Seats: '',
      Cost: '',
      OriginLatitude:'',
      OriginLongitude:'',
      DestinationLatitude:'',
      DestinationLongitude:'',
    }
  );
  const [originLat, setOriginLat] = useState(0);
  const [originLng, setOriginLng] = useState(0);
  const [destinationLat, setDestinationLat] = useState(0);
  const [destinationLng, setDestinationLng] = useState(0);
  const [pickUpTime, setPickUpTime] = useState('');
  const [directions, setDirections] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const count = 0;
  const [showPayment, setshowPayment] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    
    
    fetchData();
  }, []);

  const fetchData = async () => {
 /*    try { */
 const existingRecord = await fetch(`http://localhost:9000/riderOrders/${parsedData?.userName}`);
 if (existingRecord.ok) {
   const existingRecordData = await existingRecord.json();
   if (!existingRecordData) {
     setShowButton(true);
     return;
   }
   else if (Array.isArray(existingRecordData)) {
     if (existingRecordData.length>0) {
     const recordRequested = existingRecordData.filter(record => record.DriverPostStatus == 'Open');
     if (recordRequested.length>0) {
    alert('You have already requested');
    return;
    }
 else  {
   setShowButton(true);
   return;
 }
} 

}    else if (existingRecordData.DriverPostStatus == 'Completed' ) {
setShowButton(true);
return;
} 

 } else {
   setError('Failed to fetch profile data');
 }
/*   } catch (error) {
 setError('Failed to fetch profile data');
} */


}
  
    /** @type React.MutableRefObject<HTMLInputElement>*/
    const originRef = useRef();
    /** @type React.MutableRefObject<HTMLInputElement>*/
    const destinationRef = useRef();
    const {isLoaded} = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_API 
      , libraries: libraries
    }
    )
    
    if(!isLoaded) {
      return <div>loading......</div>;
    }

  const CreateRides = async () => {
    try {
      const response = await fetch('http://localhost:9000/riderOrders/');
      const riderData = await response.json();
      console.log("Rider Data at Driver side", riderData.Driver);
    }
    catch(error){
      console.error(error);
    }
  }
  
/*   useEffect(() => {
    CreateRides();
  }, []); */


/*   const fetchLocationLatLngStartLocation = async (locations) => {
    const location = locations; // Replace with the location you want to fetch lat/lng for
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        console.log('hello')
        const { lat, lng } = results[0].geometry.location;
        setOriginLat(lat());
        setOriginLng(lng());
        console.log(originLat);
      } else {
        console.error('Error fetching lat/lng:', status);
      }
    });
  };
 */
  const handleGeocodeLocation = async (location) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.REACT_APP_GOOGLE_API}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;
        const locationObject = ({latProp:lat,lngProp:lng});
        //console.log(locationObject.latProp)
        return locationObject;
        
      } else {
        setErrorMessage("Error while requesting geocoding API");
      }
    } catch (error) {
      setErrorMessage("Error while requesting geocoding API");
    }
  };


/*   const fetchLocationLatLngDestination = async (locations) => {
    const location = locations; // Replace with the location you want to fetch lat/lng for
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
       // console.log('hello')
        setDestinationLat(lat());
        setDestinationLng(lng());
        
        console.log(destinationLat);
      } else {
        console.error('Error fetching lat/lng:', status);
      }
    });
  }; */
 
  const PostRide = async (event) => {
    
    let errorMsg = '';
     if (data.Seats < 1)  {
      if (!data.Seats) {
        errorMsg = 'Number of Seats should be greater than 1';
      } else if (data.Seats< 1) {
        errorMsg = 'Seats must be greater than 0';
      } else if (data.Seats > 7) {
        errorMsg = 'Seats cannot be more than 7';
      }
      setError(prevState => ({ ...prevState, [data.Seats]: errorMsg }));
    }

    if (data.Cost === 'Cost') {
      if (!data.Cost) {
        errorMsg = 'Cost is required';
      } else if (data.Cost < 0) {
        errorMsg = 'Cost cannot be negative';
      } else if (data.Cost > 1000) {
        errorMsg = 'Cost cannot be more than 1000';
      }
      setError(prevState => ({ ...prevState, [data.Cost]: errorMsg }));
    }

  
    event.preventDefault();
    const origin =  await handleGeocodeLocation(originRef.current.value);
    const destination = await handleGeocodeLocation(destinationRef.current.value);
    const newOrderNumber = Math.floor(Math.random() * 1000000000).toString();
    try {
      const response = await fetch('http://localhost:9000/riderOrders/', { //fetch api with the call back function
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...data, DriverOrderNumber: newOrderNumber,
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
          DriverPostStatus:"Open"}),
      });
      const responsedata = await response.json();
      console.log(responsedata);

    } catch (error) {
      console.error(error);
    }
    setData( {DriverOrderNumber: '',
    DriverId:'',
    StartingLocation: '',
    Destination: '',
    Status: 'Open',
    Seats: '',
    Cost: '',
    OriginLatitude:'',
    OriginLongitude:'',
    DestinationLatitude:'',
    DestinationLongitude:'',
  })
  originRef.current.value = '';
  destinationRef.current.value = '';
  navigate('/driverHome');
  };
  
  const driverValues = (e) => {

    setData({ ...data, [e.target.name]: e.target.value });
    
};  
  
  return (

            <div className='driver-create-page'> 
                <DriverNavBar driver={parsedData}/>
                <GifComponent/>
                <div className='driver-seacrh-container'>
                  <form className="driver-login-form">
                    <div className='driver-lock-logo'>
                        <p className="driver-login-text-postride">
                          <span className="fa-stack fa-lg">
                            <i className="fa fa-circle fa-stack-2x"></i>
                            <i className="fa fa-lock fa-stack-1x"></i>
                          </span>
                        </p>
                    </div>

                    <div>
                      <Autocomplete>
                        <input id="StartingLocation" type="text" name = 'StartingLocation'   ref={originRef}  className="login-username" autoFocus={true} required={true} placeholder="From?" />
                        </Autocomplete>

                        <Autocomplete>
                        <input id="Destination" type="text" name = 'StartingLocation'  ref={destinationRef}  className="login-username" autoFocus={true} required={true} placeholder="To?" />
                        </Autocomplete>

                        <input id="seats" placeholder='Seats' type="number" value={data.Seats} name='Seats' onChange={driverValues} className="login-username" />

                        <input id="cost" placeholder='Cost' value={data.Cost} name='Cost' onChange={driverValues} className="login-username" />
                    </div>


                      { (showButton === true ) ? (
                      <div className='button-class'>
                        <button type="submit"  className="driver-login-submit" onClick={PostRide}>POST A RIDE!</button>
                      </div> )
                         : 
                        <div className="alert">
                        <span className="closebtn">&times;</span>  
                        <strong>Hold on!</strong> Complete the previous Ride to start one!
                        </div> }
                  </form>   
                </div>
                  
              </div> 
);}

            {/* 
                <div >
                  <h1>*** Create a Ride Request ***</h1>
                  <Autocomplete>
                    <input name = 'StartingLocation' /* value={destination} /* onChange={onDestinationChange} */ /* ref={originRef}/>
                  </Autocomplete>
                  */
                /*  <Autocomplete>
                  <input name = 'Destination' /* value={destination} /* onChange={onDestinationChange} */} {/*ref={destinationRef}/>
                  </Autocomplete> */}

                  {/* <input placeholder='Seats' value={data.Seats} name='Seats' onChange={driverValues}/>
                  <input placeholder='Cost' value={data.Cost} name='Cost' onChange={driverValues}/> */}
                  {/* <button
                  onClick={PostRide}
                  >
                    Create a ride
                  </button>
                </div>
              );
            }; */}

export default DriverRide;