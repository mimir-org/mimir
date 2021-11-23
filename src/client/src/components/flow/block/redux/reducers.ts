import * as Type from "./types";
import { BlockNodeSize } from "../../../../models/project";
import { Size } from "../../../../compLibrary/size";
import { Aspect } from "../../../../models";

const parent = {
  aspect: Aspect.NotSet,
  size: {
    width: window.innerWidth - Size.BlockMarginX,
    height: window.innerWidth - Size.BlockMarginX,
  } as BlockNodeSize,
};

const parentProduct = {
  aspect: Aspect.Product,
  size: {
    width: window.innerWidth - Size.BlockMarginX,
    height: window.innerWidth - Size.BlockMarginX,
  } as BlockNodeSize,
};

const initialState = { blockParents: [parent, parentProduct] };

export function blockNodeSizeReducer(state = initialState, action: Type.BlockNodeSizeActionTypes) {
  if (action.type === Type.SET_BLOCK_NODE_SIZE)
    return {
      ...state,
      blockNodes: state.blockParents.map(
        (x) =>
          x.aspect !== Aspect.Product && {
            ...x,
            size: { width: action.payload.width, height: action.payload.height - Size.BlockMarginY },
          }
      ),
    };

  if (action.type === Type.SET_BLOCK_NODE_WIDTH)
    return {
      ...state,
      blockNodes: state.blockParents.map(
        (x) =>
          x.aspect !== Aspect.Product && {
            ...x,
            size: { width: action.payload.width, height: state.blockParents[0].size.height },
          }
      ),
    };

  if (action.type === Type.SET_BLOCK_NODE_HEIGHT)
    return {
      ...state,
      blockNodes: state.blockParents.map(
        (x) =>
          x.aspect !== Aspect.Product && {
            ...x,
            size: { width: state.blockParents[0].size.width, height: action.payload.height },
          }
      ),
    };

  if (action.type === Type.SET_BLOCK_PRODUCT_NODE_SIZE)
    return {
      ...state,
      blockNodes: state.blockParents.map(
        (x) =>
          x.aspect === Aspect.Product && {
            ...x,
            size: { width: action.payload.width, height: action.payload.height - Size.BlockMarginY },
          }
      ),
    };

  if (action.type === Type.SET_BLOCK_PRODUCT_NODE_WIDTH)
    return {
      ...state,
      blockNodes: state.blockParents.map(
        (x) =>
          x.aspect === Aspect.Product && {
            ...x,
            size: { width: action.payload.width, height: state.blockParents[0].size.height },
          }
      ),
    };

  if (action.type === Type.SET_BLOCK_PRODUCT_NODE_HEIGHT)
    return {
      ...state,
      blockNodes: state.blockParents.map(
        (x) =>
          x.aspect === Aspect.Product && {
            ...x,
            size: { width: state.blockParents[0].size.width, height: action.payload.height },
          }
      ),
    };

  return state;
}
