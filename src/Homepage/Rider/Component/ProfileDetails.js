import React, { useState, useEffect, useRef } from "react";

const ProfileDetails = ({ profileData }) => {
  return (
    <>
      <span>Rider: &nbsp;</span>
      <input
        type="text"
        required="true"
        value={profileData.RiderName}
        /* onChange={} */
      ></input>
      <span>Email: &nbsp;</span>
      <input required="true" value={profileData.RiderEmail}></input>
      <span>Ratings: &nbsp;</span>
      <input required="true" value={profileData.ratings}></input>
    </>
  );
};

export default ProfileDetails;
