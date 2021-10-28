import { SET_BLOCKNODE_SIZE, BlockNodeSizeActionTypes } from "./types";
import { Size } from "../../../../compLibrary";

const initialState = {
  width: Size.BlockView_Width,
  length: Size.BlockView_Length,
};

export function blockNodeSizeReducer(state = initialState, action: BlockNodeSizeActionTypes) {
  if (action.type === SET_BLOCKNODE_SIZE) {
    return {
      ...state,
      width: action.payload.width,
      length: action.payload.length,
    };
  }
  return state;
}
