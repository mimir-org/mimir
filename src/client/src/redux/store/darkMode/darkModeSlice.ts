import { createSlice } from "@reduxjs/toolkit";

const initialDarkModeState = {
  active: true,
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: initialDarkModeState,
  reducers: {
    toggleDarkMode: (state) => {
      state.active = !state.active;
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
