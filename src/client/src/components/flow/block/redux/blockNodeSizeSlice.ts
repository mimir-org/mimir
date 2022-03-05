import { Size } from "../../../../compLibrary/size/Size";
import { BlockNodeSize } from "./types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Aspect } from "../../../../models";

const parent = {
  aspect: Aspect.NotSet,
  size: {
    width: Size.BLOCK_PARENT_WIDTH,
    height: window.innerHeight - 140,
  },
};

const parentProduct = {
  aspect: Aspect.Product,
  size: {
    width: Size.BLOCK_PARENT_WIDTH,
    height: window.innerHeight - Size.BLOCK_MARGIN_Y,
  },
};

const initialBlockNodeSizeState = { blockParents: [parent, parentProduct] };

export const blockNodeSizeSlice = createSlice({
  name: "blockNodeSize",
  initialState: initialBlockNodeSizeState,
  reducers: {
    setBlockNodeSize: (state, action: PayloadAction<BlockNodeSize>) => {
      const { width, height } = action.payload;
      state.blockParents.forEach((x) => {
        x.aspect !== Aspect.Product && (x.size = { width, height: height - Size.BLOCK_MARGIN_Y });
      });
    },
  },
});

export const { setBlockNodeSize } = blockNodeSizeSlice.actions;
export default blockNodeSizeSlice.reducer;
