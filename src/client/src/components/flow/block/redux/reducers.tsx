import { SET_BLOCKNODE_SIZE, BlockNodeSizeActionTypes } from "./types";
import { Size } from "../../../../compLibrary";

const initialState = {
  size: {
    width: Size.BlockView_Width,
    height: Size.BlockView_Height,
  },
};

export function blockNodeSizeReducer(state = initialState, action: BlockNodeSizeActionTypes) {
  if (action.type === SET_BLOCKNODE_SIZE) {
    return {
      ...state,
      size: { width: action.payload.width, height: action.payload.height },
    };
  }
  return state;
}