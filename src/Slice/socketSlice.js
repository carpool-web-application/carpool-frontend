import { createSlice } from '@reduxjs/toolkit';
/* import socket from '../Config/socket-config'; */

export const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    isConnected: false,
  },
  reducers: {
    connected: (state) => {
      state.isConnected = true; // Update connection status
    },
    disconnected: (state) => {
      state.isConnected = false; // Update connection status
    },
  },
});

export const { connected, disconnected } = socketSlice.actions;

// Setup socket connection and event listeners
/* export const setupConnection = () => (dispatch) => {
  if (!socket.connected) {
    socket.connect();  // Connects the socket if not already connected
  }

  // Listen for 'connect' event
  socket.on('connect', () => {
    console.log('Socket connected');
    dispatch(connected());
  });

  // Listen for 'disconnect' event
  socket.on('disconnect', () => {
    console.log('Socket disconnected');
    dispatch(disconnected());
  });

  // Optional: Handle connection errors
  socket.on('connect_error', (error) => {
    console.error('Connection Error:', error);
    // Dispatch an action if you want to store the error state
  });
};

// Disconnect the socket
export const teardownConnection = () => (dispatch) => {
  if (socket.connected) {
    socket.disconnect();
  }
};


export const messageSocket = () => (dispatch) => {
  
  socket.on("message", (arg) => {
    console.log(arg.message); // Log the message received from the server
  });
};
 */
export default socketSlice.reducer;
