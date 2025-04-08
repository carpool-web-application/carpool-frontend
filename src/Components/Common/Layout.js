import React from "react";
import styled from "styled-components";
import DriverNavBar from "../../Navbar/driver/navBarComponent-driver";
import RiderNavbar from "../../Navbar/rider/navBarComponent-rider";
import styles from "./Layout.module.css";
const MainContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const Layout = ({ userType, children, userData }) => {
  return (
    <>
      {userType === "Rider" ? (
        <RiderNavbar riderData={userData} />
      ) : userType === "Driver" ? (
        <DriverNavBar driver={userData} />
      ) : (
        <></>
      )}
      {children}
    </>
  );
};

export default Layout;
