import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import RideHistory from "./DriverRides/RideHistory.js";
import { useDispatch, useSelector } from "react-redux";
import { removeAuth, storeAuth } from "./Slice/authSlice.js";
import { ProtectedRoutes } from "./Utils/ProtectedRoutes.js";
const Layout = React.lazy(() => import("./Components/Common/Layout.js"));
const Search = React.lazy(() => import("./Search/search.js"));

const CreateProfile = React.lazy(() => import("./User/UserProfileCreation.js"));
const DriverComp = React.lazy(() =>
  import("./PostCommute/DriverCreateRide.js")
);
const AboutPage = React.lazy(() => import("./AboutPage.js"));
const Login = React.lazy(() => import("./Login/LoginComp.js"));
const Home = React.lazy(() => import("./LandingPage/Home.js"));
const DriverHome = React.lazy(() => import("./Homepage/Driver/DriverHome.js"));

const Payment = React.lazy(() => import("./Payment/payment.js"));
const DriverApproval = React.lazy(() =>
  import("./DriverApproval/driverApproval.js")
);
const DriverPastRides = React.lazy(() =>
  import("./DriverTrips/driverPastRides.js")
);
const RiderPastRides = React.lazy(() => import("./MyTrips/riderPastRides.js"));
const RiderHome = React.lazy(() => import("./Homepage/Rider/RiderHome.js"));

const CarpoolApplication = () => {
  const firstTime = "";
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.authUser);
  const { userData } = useSelector((state) => state.user);
  const handleExpiredSession = () => {
    sessionStorage.removeItem("authTime");
    localStorage.removeItem("auth");
    dispatch(removeAuth());
    return (
      <>
        <Home />
      </>
    );
  };

  const handleRelogin = (remainTime) => {
    const timeoutDuration = sessionStorage.getItem("authTime") - Date.now();
    if (timeoutDuration > 0) {
      setTimeout(() => {
        console.log("Session expired. Logging out.");
        handleExpiredSession();
      }, remainTime || 3600000);
    } else {
      console.log("Session already expired. Logging out immediately.");
      handleExpiredSession();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("auth");
    const storedExpiryTime = sessionStorage.getItem("authTime");

    if (token && storedExpiryTime) {
      const currentTime = Date.now();
      if (currentTime >= storedExpiryTime) {
        handleExpiredSession();
      } else {
        dispatch(
          storeAuth({ isAuthenticated: true, expiryTime: storedExpiryTime })
        );
        handleRelogin(storedExpiryTime - Date.now());
      }
    }
  }, [firstTime]);
  console.log(isAuthenticated);
  return (
    <>
      <Router>
        {isAuthenticated && (
          <Layout userType={userData?.commuterType} userData={userData}>
            <Routes>
              <Route
                path="/createRide"
                element={
                  isAuthenticated ? (
                    <ProtectedRoutes allowedRoles={"Driver"}>
                      <DriverComp />
                    </ProtectedRoutes>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/searchRide"
                element={
                  isAuthenticated ? <Search /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/driverHome"
                element={
                  isAuthenticated ? (
                    <ProtectedRoutes allowedRoles={"Driver"}>
                      <DriverHome />
                    </ProtectedRoutes>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/pastRide"
                element={
                  isAuthenticated ? <RideHistory /> : <Navigate to="/login" />
                }
              />

              <Route
                path="/riderHome"
                element={
                  isAuthenticated ? (
                    <ProtectedRoutes allowedRoles={"Rider"}>
                      <RiderHome />
                    </ProtectedRoutes>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/driverApproval"
                element={
                  isAuthenticated ? (
                    <ProtectedRoutes allowedRoles={"Driver"}>
                      <DriverApproval />
                    </ProtectedRoutes>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/pastRides"
                element={
                  isAuthenticated ? (
                    <ProtectedRoutes allowedRoles={"Driver"}>
                      <DriverPastRides />
                    </ProtectedRoutes>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/riderpastRides"
                element={
                  isAuthenticated ? (
                    <ProtectedRoutes allowedRoles={"Rider"}>
                      <RiderPastRides />
                    </ProtectedRoutes>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/login"
                element={<Login setTimer={handleRelogin} />}
              />
            </Routes>
          </Layout>
        )}
        <Routes>
          <Route path="/homePage" element={<Home />} />
          <Route path="/login" element={<Login setTimer={handleRelogin} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/" element={<Home />} />
          <Route path="/createProfile" element={<CreateProfile />} />
        </Routes>
      </Router>
    </>
  );
};

export default CarpoolApplication;
