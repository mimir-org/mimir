import { createSlice } from "@reduxjs/toolkit";

const initialEdgeAnimationState = {
  animated: false,
};

export const edgeAnimationSlice = createSlice({
  name: 'edgeAnimation',
  initialState: initialEdgeAnimationState,
  reducers: {
    toggleEdgeAnimation: (state) => {
      state.animated = !state.animated;
    }
  }
})

export const { toggleEdgeAnimation } = edgeAnimationSlice.actions;
export default edgeAnimationSlice.reducer;
