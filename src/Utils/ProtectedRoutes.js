import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoutes = ({ children }) => {
  const driverData = useSelector((state) => state.driver.driver);
  const riderData = useSelector((state) => state.rider.rider);
  const authenticate = () => {
    if (driverData || riderData) {
      return true;
    }
    return false;
  };

  const isAuthenticated = authenticate();

  if (!isAuthenticated) {
    // Redirect them to the login page, but save the current location they were trying to go to
    return <Navigate to="/login" replace />;
  }

  return children;
};
