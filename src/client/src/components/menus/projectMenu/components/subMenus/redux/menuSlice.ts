import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MenuState } from "./types";

const initialMenuState: MenuState = {
  filterMenuVisibility: false,
  activeMenu: null,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState: initialMenuState,
  reducers: {
    changeActiveMenu: (state, action: PayloadAction<string>) => {
      state.activeMenu = action.payload;
    },
    setFilterMenuVisibility: (state, action: PayloadAction<boolean>) => {
      state.filterMenuVisibility = action.payload;
    },
  },
});

export const { changeActiveMenu, setFilterMenuVisibility } = menuSlice.actions;
export default menuSlice.reducer;
