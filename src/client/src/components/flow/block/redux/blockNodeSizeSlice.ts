import { Size } from "../../../../compLibrary/size";
import { BlockNodeSize } from "./types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  size: { width: Size.BLOCK_PARENT_WIDTH, height: window.innerHeight - Size.BLOCK_MARGIN_BOTTOM },
};

export const blockNodeSizeSlice = createSlice({
  name: "blockNodeSize",
  initialState: initialState,
  reducers: {
    setBlockNodeSize: (state, action: PayloadAction<BlockNodeSize>) => {
      const width = action.payload.width;
      const height =
        action.payload.height > Size.BLOCK_PARENT_MIN_HEIGHT
          ? action.payload.height - Size.BLOCK_MARGIN_Y
          : Size.BLOCK_PARENT_MIN_HEIGHT;

      const size = { width, height };
      state.size = size;
    },
  },
});

export const { setBlockNodeSize } = blockNodeSizeSlice.actions;
export default blockNodeSizeSlice.reducer;
