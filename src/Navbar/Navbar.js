
import React, { useState , useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from '../Search/search.js';
import DriverRide from '../Driver/DriverCreateRide.js';
import CreateProfile from '../User/UserProfileCreation.js';
import DriverComp from '../Driver/DriverCreateRide.js';
import AboutPage from '../AboutPage.js';
import Login from '../Login/LoginComp.js';
import Home from '../Home/Home.js';
import DriverHome from '../Home/DriverHome.js';
import RiderHome from '../Home/RiderHome.js';
import Payment from '../Payment/payment';
import DriverApproval from '../DriverApproval/driverApproval.js';
import DriverPastRides from '../DriverPastRides/driverPastRides.js';
import RiderPastRides from '../RiderPastRides/riderPastRides.js';
import { io } from 'socket.io-client';
export const socket = io('http://localhost:9000');
const Navbar = () => {

  
  return (
    
    <Router>
      <Routes>
        <Route path="/DriverRide" element={<DriverRide />}/>
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/*" element={<Home/>}/>
        <Route path="/homePage" element={<Home/>}/>
        <Route path="/createProfile" element={<CreateProfile/>} /> 
        <Route path="/login" element={<Login/>}/>
        <Route path="/riderLogin" element={<Search />}/>
        <Route path="/driverLogin" element={<DriverComp/>}/>
        <Route path="/driverHome" element={<DriverHome/>}/>
        <Route path="/riderHome" element={<RiderHome/>}/>
        <Route path="/driverApproval" element={<DriverApproval/>}/>
        <Route path="/pastRides" element={<DriverPastRides/>}/>
        <Route path="/riderpastRides" element={<RiderPastRides/>}/>
      </Routes>

    </Router>  
  );
};

export default Navbar;