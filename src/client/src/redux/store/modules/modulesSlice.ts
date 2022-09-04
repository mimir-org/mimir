import { MODULE_TYPE } from "../../../models/project";
import { ModuleState, ModulesState, ModulesVisibility } from "./types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialModuleState: ModulesState = {
  types: [
    { type: MODULE_TYPE.INSPECTOR, visible: false, animate: false },
    { type: MODULE_TYPE.LIBRARY, visible: false, animate: false },
    { type: MODULE_TYPE.EXPLORER, visible: false, animate: false },
    { type: MODULE_TYPE.LEGEND, visible: false, animate: false },
  ],
};

export const modulesSlice = createSlice({
  name: "modules",
  initialState: initialModuleState,
  reducers: {
    setModuleVisibility: (state, action: PayloadAction<ModuleState>) => {
      state.types.forEach((type) => {
        if (type.type === action.payload.type) {
          type.visible = action.payload.visible;
          type.animate = true;
        }
      });
    },
    setModulesVisibility: (state, action: PayloadAction<ModulesVisibility>) => {
      state.types.forEach((type) => {
        type.visible = action.payload.visible;
        type.animate = action.payload.animate;
      });
    },
    toggleModuleVisibility: (state, action: PayloadAction<string>) => {
      state.types.forEach((type) => {
        if (type.type === action.payload) {
          type.visible = !type.visible;
          type.animate = true;
        }
      });
    },
  },
});

export const { setModuleVisibility, setModulesVisibility, toggleModuleVisibility } = modulesSlice.actions;
export default modulesSlice.reducer;
