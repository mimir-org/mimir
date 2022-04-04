import { Size } from "../../../../compLibrary/size/Size";
import { BlockNodeSize } from "./types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  size: { width: Size.BLOCK_NODE_WIDTH, height: Size.BLOCK_NODE_HEIGHT },
};

export const blockNodeSizeSlice = createSlice({
  name: "blockNodeSize",
  initialState: initialState,
  reducers: {
    setBlockNodeSize: (state, action: PayloadAction<BlockNodeSize>) => {
      state.size = { width: action.payload.width, height: action.payload.height };
    },
  },
});

export const { setBlockNodeSize } = blockNodeSizeSlice.actions;
export default blockNodeSizeSlice.reducer;
