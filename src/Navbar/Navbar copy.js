import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "../Search/search.js";
import CreateProfile from "../User/UserProfileCreation.js";
import DriverComp from "../PostCommute/DriverCreateRide.js";
import AboutPage from "../AboutPage.js";
import Login from "../Login/LoginComp.js";
import Home from "../Home/Home.js";
import DriverHome from "../Homepage/Driver/DriverHome.js";

import Payment from "../Payment/payment";
import DriverApproval from "../DriverApproval/driverApproval.js";
import DriverPastRides from "../DriverTrips/driverPastRides.js";
import RiderPastRides from "../MyTrips/riderPastRides.js";
import { ProtectedRoutes } from "../Utils/ProtectedRoutes.js";
import { io } from "socket.io-client";
import RideHistory from "../DriverRides/RideHistory.js";

export const socket = io("http://localhost:9000");
const RiderHome = React.lazy(() => import("../Homepage/Rider/RiderHome.js"));
const Navbar = () => {
  return (
/*     <Router>
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/*" element={<Home />} />
        <Route path="/homePage" element={<Home />} />
        <Route path="/createProfile" element={<CreateProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/searchRide" element={<Search />} />
        <Route path="/createRide" element={<DriverComp />} />
        <Route path="/pastRide" element={<RideHistory />} />
        <Route
          path="/driverHome"
          element={
            <ProtectedRoutes>
              <DriverHome />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/riderHome"
          element={
            <ProtectedRoutes>
              <RiderHome />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/driverApproval"
          element={
            <ProtectedRoutes>
              <DriverApproval />
            </ProtectedRoutes>
          }
        />
        <Route path="/pastRides" element={<DriverPastRides />} />
        <Route path="/riderpastRides" element={<RiderPastRides />} />
      </Routes>
    </Router> */
  );
};

export default Navbar;
