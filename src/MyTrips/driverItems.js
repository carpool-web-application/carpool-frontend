//importing scss files,image and react so that code can be written using their functions

import React, { useState ,useEffect } from 'react';

const  DriverOrderitems = (props) => {
const [rating,setRating] = useState(0);
const [ratingFlag,setRatingFlag] = useState(props.RatingFlag);
const [showRide,setShowRide] = useState(false);
const [error,setError] = useState('');
    console.log(props.RatingFlag)
  //Using usestate to assign classes based on the click of the reminder name to expand reduce the size of the remidner. It also strikes the reminder if it complete

    const ratingChange = async (e) => {
        setRating(e.target.value);
    }

    const handleSubmitRating = async () => {
        fetch(`http://localhost:9000/drivers/${props.driverid}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ratings: rating}) // set the new status based on the checkbox value
          })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete reminder status');
          }
          else {
            setRatingFlag('Y');
            console.log('Successfully deleted');
          }
        })
        .catch(error => {
          console.error(error);
          // handle the error
        });

        fetch(`http://localhost:9000/riderOrders/${props.driverid}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ RatingFlag: 'Y'}) // set the new status based on the checkbox value
          })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete reminder status');
          }
          else {
            
            console.log('Successfully deleted');
          }
        })
        .catch(error => {
          console.error(error);
          // handle the error
        });
    }
console.log(ratingFlag)
//a return function with all the div where all the container will load which is existing or created
  return (
    <div className='rider-details' >
      <p className="rider-name"> {props.driverid} is your ride details</p>
      <p className="rider-name"> {props.origin}</p>
      <p className="rider-name"> {props.destination}</p>
      <p className="rider-name"> {props.driverorderNumbmer}</p>
    { ratingFlag === 'N' ? (    <div>

<button className='acceptbtn' onClick={handleSubmitRating}>Submit Rating</button>
<input  className='rating-btn' height="40px" width="20px" type="Number" name = 'StartingLocation'   value = {rating} onChange={ratingChange} placeholder="Enter Rating" min={0} max = {5}/>

</div>

    
    ): null

    }
    
    </div>


  );
};



export default DriverOrderitems;