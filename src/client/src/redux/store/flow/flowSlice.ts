import { FlowState } from "./types";
import { VIEW_TYPE, ViewType } from "../../../models/project";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: FlowState = {
  view: VIEW_TYPE.STARTPAGE as ViewType,
};

export const flowSlice = createSlice({
  name: 'flow',
  initialState: initialState,
  reducers: {
    changeFlowView: (state, action: PayloadAction<ViewType>) => {
      state.view = action.payload;
    }
  }
})

export const { changeFlowView } = flowSlice.actions;
export default flowSlice.reducer;