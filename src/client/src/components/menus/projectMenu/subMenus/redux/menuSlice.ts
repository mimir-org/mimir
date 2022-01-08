import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuState } from "./types";

const initialMenuState: MenuState = {
  projectMenuVisibility: false,
  userMenuVisibility: false,
  filterMenuVisibility: false,
  activeMenu: null,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState: initialMenuState,
  reducers: {
    changeActiveMenu: (state, action: PayloadAction<string>) => {
      state.activeMenu = action.payload;
    },
    setProjectMenuVisibility: (state, action: PayloadAction<boolean>) => {
      state.projectMenuVisibility = action.payload;
    },
    setUserMenuVisibility: (state, action: PayloadAction<boolean>) => {
      state.userMenuVisibility = action.payload;
    },
    setFilterMenuVisibility: (state, action: PayloadAction<boolean>) => {
      state.filterMenuVisibility = action.payload;
    }
  }
})

export const { changeActiveMenu, setProjectMenuVisibility, setUserMenuVisibility, setFilterMenuVisibility } = menuSlice.actions;
export default menuSlice.reducer;
