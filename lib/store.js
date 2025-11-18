import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cvReducer from "./cvSlice";

const persistConfig = {
  key: "cv-builder",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cvReducer);

export const store = configureStore({
  reducer: {
    cv: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
