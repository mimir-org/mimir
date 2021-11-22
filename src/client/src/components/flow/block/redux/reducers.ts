import { SET_BLOCKNODE_SIZE, BlockNodeSizeActionTypes } from "./types";
import { BlockNodeSize } from "../../../../models/project";
import { Size } from "../../../../compLibrary/size";

const initialState = {
  size: {
    width: window.innerWidth - Size.BlockMarginX,
    height: window.innerHeight - Size.BlockMarginY,
  } as BlockNodeSize,
};

export function blockNodeSizeReducer(state = initialState, action: BlockNodeSizeActionTypes) {
  if (action.type === SET_BLOCKNODE_SIZE) {
    return {
      ...state,
      size: { width: action.payload.width, height: action.payload.height - Size.BlockMarginY },
    };
  }
  return state;
}
