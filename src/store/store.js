import { configureStore } from "@reduxjs/toolkit";
import genericReducer from "./genericSlice.js";
import adminReducer from "./adminSlice.js";
import websiteReducer from "./websiteSlice.js";

/**
 * Store setup
 */
export const store = configureStore({
  reducer: {
    generic: genericReducer,
    admin: adminReducer,
    website: websiteReducer,
  },
});
