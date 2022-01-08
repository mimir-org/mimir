import { LibraryCategory } from "../../../models/project";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LibItem } from "../../../models";

const initialCustomCategoryState: LibraryCategory = {
  name: "Favorites",
  nodes: [],
};

export const customCategorySlice = createSlice({
  name: 'customCategory',
  initialState: initialCustomCategoryState,
  reducers: {
    addCustomCategoryNode: (state, action: PayloadAction<LibItem>) => {
      state.nodes.push(action.payload);
    },
    removeCustomCategoryNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter((n) => n.id !== action.payload);
    }
  }
})

export const { addCustomCategoryNode, removeCustomCategoryNode } = customCategorySlice.actions;
export default customCategorySlice.reducer;