import { LibraryCategory } from "../../../models/project";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NodeLibCm } from "@mimirorg/typelibrary-types";

const initialCustomCategoryState: LibraryCategory = {
  name: "Favorites",
  nodes: [],
};

export const customCategorySlice = createSlice({
  name: "customCategory",
  initialState: initialCustomCategoryState,
  reducers: {
    addCustomCategoryNode: (state, action: PayloadAction<NodeLibCm>) => {
      state.nodes.push(action.payload);
    },
    removeCustomCategoryNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter((n) => n.id !== action.payload);
    },
  },
});

export const { addCustomCategoryNode, removeCustomCategoryNode } = customCategorySlice.actions;
export default customCategorySlice.reducer;
