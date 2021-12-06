import * as Type from "./types";

export function setBlockNodeSize(width: number, height: number): Type.BlockNodeSizeActionTypes {
  return {
    type: Type.SET_BLOCK_NODE_SIZE,
    payload: { width, height },
  };
}

export function setBlockNodeWidth(width: number): Type.BlockNodeSizeActionTypes {
  return {
    type: Type.SET_BLOCK_NODE_WIDTH,
    payload: { width },
  };
}

export function setBlockNodeHeight(height: number): Type.BlockNodeSizeActionTypes {
  return {
    type: Type.SET_BLOCK_NODE_HEIGHT,
    payload: { height },
  };
}

export function setBlockProductNodeSize(width: number, height: number): Type.BlockNodeSizeActionTypes {
  return {
    type: Type.SET_BLOCK_PRODUCT_NODE_SIZE,
    payload: { width, height },
  };
}

export function setBlockProductNodeWidth(width: number): Type.BlockNodeSizeActionTypes {
  return {
    type: Type.SET_BLOCK_PRODUCT_NODE_WIDTH,
    payload: { width },
  };
}

export function setBlockProductNodeHeight(height: number): Type.BlockNodeSizeActionTypes {
  return {
    type: Type.SET_BLOCK_PRODUCT_NODE_HEIGHT,
    payload: { height },
  };
}
