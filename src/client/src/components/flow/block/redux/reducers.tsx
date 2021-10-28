import { SET_BLOCKNODE_SIZE, BlockNodeSizeActionTypes } from "./types";
import { Size } from "../../../../compLibrary";

const initialState = {
  width: Size.BlockView_Width,
};

export function blockNodeSizeReducer(state = initialState, action: BlockNodeSizeActionTypes) {
  if (action.type === SET_BLOCKNODE_SIZE) {
    return {
      ...state,
      width: action.payload.width,
    };
  }
  return state;
}
