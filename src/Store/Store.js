import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'; 
import driverReducer from '../Slice/driverSlice';
import riderReducer from '../Slice/riderSlice';
/* import socketReducer from '../Slice/socketSlice'; */

const persistConfig = {
    key: 'root',
    storage,
  };
  
  const persistedDriverReducer = persistReducer(persistConfig, driverReducer);
  const persistedRiderReducer = persistReducer(persistConfig, riderReducer);
/*   const persistedSocketReducer = persistReducer(persistConfig, socketReducer); */
  
  export const store = configureStore({
    reducer: {
      driver: persistedDriverReducer,
      rider: persistedRiderReducer,
      /* socket: persistedSocketReducer, */
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });
  
  export const persistor = persistStore(store);