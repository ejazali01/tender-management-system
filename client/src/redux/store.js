import authReducer from "./reducers/AuthSlice";
import useReducer from "./reducers/UserSlice";
import tenderReducer from "./reducers/TenderSlice";
import bidReducer from "./reducers/BidSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authReducer,
  user: useReducer,
  tender: tenderReducer,
  bids: bidReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  // blacklist: ['tender'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
