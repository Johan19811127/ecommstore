import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import cart from "./cartSlice.js";
import expandSidebar from './ExpandSlice.js';
import logger from "redux-logger";


const reducers = combineReducers({ cart , expandSidebar});

const config = {
  key: "root",
  storage,
};

const reducer = persistReducer(config, reducers);

const store = configureStore({
  reducer: reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['register', 'rehydrate'],
        warnAfter: 128, // Increase the warning threshold (ms)
      },
    }),
  

});

export default store;