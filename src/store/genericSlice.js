import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: { active: false, message: "", type: "" },
  loader: false,
};

/**
 * Generic slice to handle notification and loader.
 */
export const genericSlice = createSlice({
  name: "generic",
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = { active: false, message: "", type: "" };
    },
  },
});

export const { setLoader, setNotification, clearNotification } =
  genericSlice.actions;

export default genericSlice.reducer;
