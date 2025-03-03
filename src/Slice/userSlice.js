import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser: (state, action) => {
      const userData = action.payload.userData;
      return {
        ...state,
        userData: userData,
      };
    },
    removeUser: (state, action) => {
      state.userData = null;
    },
  },
});

export const { storeUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
