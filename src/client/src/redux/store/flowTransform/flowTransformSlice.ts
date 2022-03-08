import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlowTransform } from "react-flow-renderer";
import { Size } from "../../../compLibrary/size";

const initialState: FlowTransform = {
  x: 0,
  y: 0,
  zoom: Size.DEFAULT_ZOOM_LEVEL,
};

const flowTransformSlice = createSlice({
  name: "flowTransform",
  initialState: initialState,
  reducers: {
    changeFlowTransform: (state, action: PayloadAction<FlowTransform>) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
      state.zoom = action.payload.zoom;
    },
  },
});

export const { changeFlowTransform } = flowTransformSlice.actions;
export default flowTransformSlice.reducer;
