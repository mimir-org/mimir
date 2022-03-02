import { Size } from "../../../../compLibrary/size";
import { BlockNodeSize } from "./types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Aspect } from "../../../../models";

const parent = {
  aspect: Aspect.NotSet,
  size: {
    width: Size.BlockParentNode_Width,
    height: window.innerHeight - Size.BlockMarginBottom,
  },
};

const parentProduct = {
  aspect: Aspect.Product,
  size: {
    width: Size.BlockParentNode_Width,
    height: window.innerHeight - Size.BlockMarginY,
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
        x.aspect !== Aspect.Product && (x.size = { width, height: height - Size.BlockMarginY });
      });
    },
  },
});

export const { setBlockNodeSize } = blockNodeSizeSlice.actions;
export default blockNodeSizeSlice.reducer;
