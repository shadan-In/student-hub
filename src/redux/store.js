import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./features/studentSlice";
import toastReducer from "./features/toastSlice";

// configureStore already sets up Redux DevTools and redux-thunk for us,
// so there is nothing extra to configure here.
// Open the Redux DevTools browser extension to watch every action live.
export const store = configureStore({
  reducer: {
    students: studentReducer, // state.students
    toast: toastReducer, // state.toast
  },
});
