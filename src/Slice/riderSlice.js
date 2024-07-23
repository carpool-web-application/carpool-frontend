import { createSlice } from '@reduxjs/toolkit'


export const riderSlice = createSlice({
        name: 'rider',
        initialState: {
            rider: null,
        },
   reducers: {
        storeRider: (state , action) => {
            const riderData = action.payload;
            return {
                ...state,
                rider: riderData,
              };
        },
        removeRider: (state , action) => {
            state.rider = null;
        }
    },
    },
);

export const {storeRider ,  removeRider} = riderSlice.actions;

export default riderSlice.reducer;