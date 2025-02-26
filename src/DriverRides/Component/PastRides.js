import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchRide, updateStatus } from "../../Utils/ride";
import styles from "./PatRides.module.css";

const PastRides = ({ rideData, driverData, updateRideData }) => {
  return (
    <div className={styles.pastRidesContainer}>
      <div className={styles.title}>
        <span>{`${driverData.userEmail} Created Rides`}</span>
      </div>
      <div className={styles.pastRidesCount}>
        <span>{`Past Rides Count (${rideData.length})`}</span>
      </div>
      <div className={styles.rideContainer}>
        {rideData.length > 0 ? (
          <div className={styles.rideContainerDetails}>
            {rideData.map((ride) => (
              <div className={styles.detailsContainer}>
                <div key={ride.id} className={styles.rideDetails}>
                  <div className={styles.contentDetails}>
                    <span>{`Destination: ${ride.Destination}`}</span>
                  </div>
                  <div className={styles.contentDetails}>
                    <span>{`Time: ${new Date(ride.PickUpTime).toLocaleString(
                      "en-Us",
                      {
                        year: "numeric", // "2025"
                        month: "long", // "February"
                        day: "numeric", // "23"
                        hour: "numeric", // "10 AM" or "10 PM"
                        minute: "2-digit", // "20"
                        hour12: true, // Use 12-hour clock
                      }
                    )}`}</span>
                  </div>
                  <div className={styles.contentDetails}>
                    <span>{`Cost: ${ride.Cost}`}</span>
                  </div>
                </div>
                <div className={styles.buttonsContainer}>
                  <button
                    disabled={
                      ride.status.toLowerCase() !== "available" ? true : false
                    }
                    onClick={async (e) => {
                      e.preventDefault();
                      await updateStatus(
                        ride.rideId,
                        { status: "cancelled" },
                        driverData.token
                      );
                      updateRideData();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>No Data to Display</>
        )}
      </div>
    </div>
  );
};

export default PastRides;
