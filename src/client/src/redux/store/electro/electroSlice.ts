import { createSlice } from "@reduxjs/toolkit";

const initialElectroState = {
  visible: false,
};

export const electroSlice = createSlice({
  name: 'electro',
  initialState: initialElectroState,
  reducers: {
    toggleElectroView: (state) => {
      state.visible = !state.visible;
    }
  }
})

export const { toggleElectroView } = electroSlice.actions;
export default electroSlice.reducer;
