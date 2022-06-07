import { ATTRIBUTE_TAB } from "../../../models/project";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Size } from "../../../assets/size/Size";

const initialInspectorState = {
  height: Size.MODULE_CLOSED,
  tabs: [
    { type: ATTRIBUTE_TAB.ADMIN_INFO, visible: false },
    { type: ATTRIBUTE_TAB.PARAMETERS, visible: false },
    { type: ATTRIBUTE_TAB.RELATIONS, visible: false },
    { type: ATTRIBUTE_TAB.TERMINALS, visible: false },
    { type: ATTRIBUTE_TAB.SIMPLE_TYPES, visible: false },
  ],
};

export const inspectorSlice = createSlice({
  name: "inspector",
  initialState: initialInspectorState,
  reducers: {
    changeInspectorTab: (state, action: PayloadAction<number>) => {
      state.tabs = state.tabs.map((tab, index) =>
        index === action.payload ? { ...tab, visible: true } : { ...tab, visible: false }
      );
    },
    changeInspectorHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    },
  },
});

export const { changeInspectorTab, changeInspectorHeight } = inspectorSlice.actions;
export default inspectorSlice.reducer;
