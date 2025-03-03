import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../Slice/userSlice";
import authUserReducer from "../Slice/authSlice";
/* import socketReducer from '../Slice/socketSlice'; */

const persistUserConfig = {
  key: "user",
  storage,
};

const persistAuthConfig = {
  key: "authUser",
  storage,
};

const persistedUserReducer = persistReducer(persistUserConfig, userReducer);
const persistedAuthUserReducer = persistReducer(
  persistAuthConfig,
  authUserReducer
);
/*   const persistedSocketReducer = persistReducer(persistConfig, socketReducer); */

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    authUser: persistedAuthUserReducer,
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
