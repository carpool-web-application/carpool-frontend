import { createSlice } from '@reduxjs/toolkit'


export const driverSlice = createSlice({
        name: 'driver',
        initialState: {
            driver: null,
            isLoggedIn: false,
        },
   reducers: {
        storeDriver: (state , action) => {
            const driverData = action.payload;
            return {
                ...state,
                driver: driverData,
                isLoggedIn: true
              };
        },
        removeDriver: (state , action) => {
            state.driver = null;
            state.isLoggedIn = false;
        }
    },
    },
);

export const {storeDriver ,  removeDriver} = driverSlice.actions;

export default driverSlice.reducer;