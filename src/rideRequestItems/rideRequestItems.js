//importing scss files,image and react so that code can be written using their functions

import React, { useState ,useEffect } from 'react';
import '../rideRequestItems/rideRequestItems.css';

const  RideRequestitems = (props) => {
  console.log(props.userName)
  //Using usestate to assign classes based on the click of the reminder name to expand reduce the size of the remidner. It also strikes the reminder if it complete
  const handleAcceptRider = async () => {
    if (props.avaialableseats > props.riderseats) {
      fetch(`http://localhost:9000/riderRequest/${props.userName}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ CommuteStatus: 'Approved'}) // set the new status based on the checkbox value
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update reminder status');
          }
          // update the checkbox state in the component's state
          //setCheckBox(checked);
          //props.removeRequest(props.userName)
        })
        .catch(error => {
          console.error(error);
          // handle the error
        });
  
        fetch(`http://localhost:9000/riderOrders/${props.setDriverOrders.DriverId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Availableseats: (props.avaialableseats - props.riderseats)}) // set the new status based on the checkbox value
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update reminder status');
          }
          // update the checkbox state in the component's state
          //setCheckBox(checked);
          props.removeRequest(props.userName)
        })
        .catch(error => {
          console.error(error);
          // handle the error
        });
    }
    else {
      alert('Cannot accept it as the available seats are full')
    }
    
      
  }

  const handleRejectRider = async() => {
    fetch(`http://localhost:9000/riderRequest/${props.userName}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ CommuteStatus: 'Rejected'}) // set the new status based on the checkbox value
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update reminder status');
        }
        // update the checkbox state in the component's state
        //setCheckBox(checked);
        props.removeRequest(props.userName)
      })
      .catch(error => {
        console.error(error);
        // handle the error
      });
  }

//a return function with all the div where all the container will load which is existing or created
  return (
    <div className='rider-details'>
      <div className='grid-items'>
        <div className='div-text'>
          <p className="rider-name"> {props.userName} has requested a ride!</p>
        </div>
        
        <div className='button-div'>
          <button className='acceptbtn-driver' onClick={handleAcceptRider}>ACCEPT</button>
          <button className='rejectbtn-driver' onClick={handleRejectRider}>REJECT</button>
        </div>
      </div>


    </div>

  );
};



export default RideRequestitems;