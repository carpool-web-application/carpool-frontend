import React from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    right: -100%; // Start from outside the view
  }
  to {
    right: 100px; // End at final position
  }
`;
const Toast = styled.div`
  background-color: white;
  height: 60px;
  width: 200px;
  box-sizing: border-box;
  padding: 20px;
  border-left: 5px solid red;
  position: absolute;
  top: 100px;
  right: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  animation: ${slideIn} 1s ease-out forwards;
  visibility: ${(props) => (props.visibility ? "visible" : "hidden")};
`;

const ToastComponent = ({ message, visibility }) => {
  return (
    <>
      <Toast visibility={visibility}>
        <span>{message}</span>
      </Toast>
    </>
  );
};

export default ToastComponent;
