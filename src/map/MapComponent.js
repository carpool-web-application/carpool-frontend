import React from 'react';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';

const MapComponent = ({ containerStyle, center, zoom, directions }) => {
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default MapComponent;