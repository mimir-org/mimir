import { createSlice } from "@reduxjs/toolkit";

const initialLocation3DState = {
  active: false,
};

export const location3DSlice = createSlice({
  name: "location3D",
  initialState: initialLocation3DState,
  reducers: {
    toggleLocation3D: (state) => {
      state.active = !state.active;
    },
  },
});

export const { toggleLocation3D } = location3DSlice.actions;
export default location3DSlice.reducer;
