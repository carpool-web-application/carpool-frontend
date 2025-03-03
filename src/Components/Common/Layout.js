import React from "react";
import styled from "styled-components";
import DriverNavBar from "../../Navbar/driver/navBarComponent-driver";
import RiderNavbar from "../../Navbar/rider/navBarComponent-rider";
const MainContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const Layout = ({ userType, children, userData }) => {
  return (
    <>
      <MainContainer>
        {userType === "Rider" ? (
          <RiderNavbar riderData={userData} />
        ) : userType === "Driver" ? (
          <DriverNavBar driver={userData} />
        ) : (
          <></>
        )}
        {children}
      </MainContainer>
    </>
  );
};

export default Layout;
