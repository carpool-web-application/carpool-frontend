import React from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import styled from "styled-components";
const containerStyle = {
  width: "100%",
  height: "100%",
};
//define a center point for Maps to load
const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const RidergoogleMap = styled.div`
  height: 80%;
  width: 80%;
  margin-top: 3%;
`;

const MapComponent = ({ directions }) => {
  return (
    <RidergoogleMap>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </RidergoogleMap>
  );
};

export default MapComponent;
