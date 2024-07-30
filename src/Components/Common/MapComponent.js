import React from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
};
//define a center point for Maps to load
const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const MapComponent = ({ directions }) => {
  return (
    <div className="rider-googleMap">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
