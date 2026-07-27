import { createSlice, nanoid } from "@reduxjs/toolkit";

// Toasts are kept in Redux too, so any component can show one
// by dispatching a single action.
const initialState = {
  list: [], // [{ id, message, type }]
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: {
      // "prepare" lets us build the payload before it reaches the reducer.
      // We need this because generating an id inside a reducer is not allowed
      // (reducers must give the same output for the same input).
      reducer: (state, action) => {
        state.list.push(action.payload);
      },
      prepare: (message, type = "success") => ({
        payload: { id: nanoid(), message, type },
      }),
    },

    hideToast: (state, action) => {
      state.list = state.list.filter((t) => t.id !== action.payload);
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export const selectToasts = (state) => state.toast.list;
export default toastSlice.reducer;
