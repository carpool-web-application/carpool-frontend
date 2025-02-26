import "./App.css";
import React, { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { io } from "socket.io-client";
import RideHistory from "./DriverRides/RideHistory.js";
import sessionStorage from "redux-persist/es/storage/session";

export const socket = io("http://localhost:9000");
const ProtectedRoutes = React.lazy(() => import("./Utils/ProtectedRoutes.js"));
const Search = React.lazy(() => import("./Search/search.js"));
const CreateProfile = React.lazy(() => import("./User/UserProfileCreation.js"));
const DriverComp = React.lazy(() =>
  import("./PostCommute/DriverCreateRide.js")
);
const AboutPage = React.lazy(() => import("./AboutPage.js"));
const Login = React.lazy(() => import("./Login/LoginComp.js"));
const Home = React.lazy(() => import("./Home/Home.js"));
const DriverHome = React.lazy(() => import("./Homepage/Driver/DriverHome.js"));

const Payment = React.lazy(() => import("./Payment/payment"));
const DriverApproval = React.lazy(() =>
  import("./DriverApproval/driverApproval.js")
);
const DriverPastRides = React.lazy(() =>
  import("./DriverTrips/driverPastRides.js")
);
const RiderPastRides = React.lazy(() => import("./MyTrips/riderPastRides.js"));
const RiderHome = React.lazy(() => import("./Homepage/Rider/RiderHome.js"));
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [expiryTime, setExpiryTime] = useState(null);

  const handleExpiredSession = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("authTime");
    localStorage.removeItem("auth");
    setExpiryTime(null);
    return (
      <>
        <Home />
      </>
    );
  };
  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (token) {
      const currentTime = Date.now();
      const expirationTime = sessionStorage.getItem("authTime");
      if (expirationTime && currentTime >= expirationTime) {
        handleExpiredSession(); // Handle expired session
      }
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("auth");
    const expirationTime = sessionStorage.getItem("authTime");

    if (token && expirationTime) {
      const currentTime = Date.now();
      const remainTime = expirationTime - currentTime;

      if (remainTime < 0) {
        // If the session has expired, handle it
        handleExpiredSession();
      }
    }
  }, [isAuthenticated, expiryTime]); // Only watch expiryTime

  const handleRelogin = () => {
    setTimeout(handleExpiredSession, 10000);
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setExpiryTime={setExpiryTime}
                setTimer={handleRelogin}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/" element={<Home />} />
          <Route path="/homePage" element={<Home />} />
          <Route
            path="/createProfile"
            element={
              isAuthenticated ? <CreateProfile /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/createRide"
            element={
              isAuthenticated ? <DriverComp /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/searchRide"
            element={isAuthenticated ? <Search /> : <Navigate to="/login" />}
          />
          <Route
            path="/pastRide"
            element={
              isAuthenticated ? <RideHistory /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/driverHome"
            element={
              isAuthenticated ? <DriverHome /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/riderHome"
            element={isAuthenticated ? <RiderHome /> : <Navigate to="/login" />}
          />
          <Route
            path="/driverApproval"
            element={
              isAuthenticated ? <DriverApproval /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/pastRides"
            element={
              isAuthenticated ? <DriverPastRides /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/riderpastRides"
            element={
              isAuthenticated ? <RiderPastRides /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
