import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Size } from "../../../compLibrary/size";

const initialZoomState = {
  level: Size.DEFAULT_ZOOM_LEVEL,
};

const zoomSlice = createSlice({
  name: "zoom",
  initialState: initialZoomState,
  reducers: {
    changeZoomLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
  },
});

export const { changeZoomLevel } = zoomSlice.actions;
export default zoomSlice.reducer;
