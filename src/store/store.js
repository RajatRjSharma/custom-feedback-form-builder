import { configureStore } from "@reduxjs/toolkit";
import genericReducer from "./genericSlice.js";
import adminReducer from "./adminSlice.js";

export const store = configureStore({
  reducer: {
    generic: genericReducer,
    admin: adminReducer,
  },
});
