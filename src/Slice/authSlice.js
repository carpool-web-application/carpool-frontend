import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  expiryTime: null,
};

const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    storeAuth: (state, action) => {
      const isAuthenticated = action.payload.isAuthenticated;
      const expiryTime = action.payload.expiryTime;
      return {
        ...state,
        isAuthenticated: isAuthenticated,
        expiryTime: expiryTime,
      };
    },
    removeAuth: (state, action) => {
      state.isAuthenticated = false;
      state.expiryTime = null;
    },
  },
});

export const { removeAuth, storeAuth } = authSlice.actions;

export default authSlice.reducer;
