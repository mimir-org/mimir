export const SET_BLOCK_NODE_SIZE = "SET_BLOCK_NODE_SIZE";
export const SET_BLOCK_NODE_WIDTH = "SET_BLOCK_NODE_WIDTH";
export const SET_BLOCK_NODE_HEIGHT = "SET_BLOCK_NODE_HEIGHT";
export const SET_BLOCK_PRODUCT_NODE_SIZE = "SET_BLOCK_PRODUCT_NODE_SIZE";
export const SET_BLOCK_PRODUCT_NODE_WIDTH = "SET_BLOCK_PRODUCT_NODE_WIDTH";
export const SET_BLOCK_PRODUCT_NODE_HEIGHT = "SET_BLOCK_PRODUCT_NODE_HEIGHT";

export interface SetBlockNodeSize {
  type: typeof SET_BLOCK_NODE_SIZE;
  payload: {
    width: number;
    height: number;
  };
}

export interface SetBlockNodeHeight {
  type: typeof SET_BLOCK_NODE_HEIGHT;
  payload: {
    height: number;
  };
}

export interface SetBlockNodeWidth {
  type: typeof SET_BLOCK_NODE_WIDTH;
  payload: {
    width: number;
  };
}

export interface SetBlockProductNodeSize {
  type: typeof SET_BLOCK_PRODUCT_NODE_SIZE;
  payload: {
    width: number;
    height: number;
  };
}

export interface SetBlockProductNodeHeight {
  type: typeof SET_BLOCK_PRODUCT_NODE_HEIGHT;
  payload: {
    height: number;
  };
}

export interface SetBlockProductNodeWidth {
  type: typeof SET_BLOCK_PRODUCT_NODE_WIDTH;
  payload: {
    width: number;
  };
}

export type BlockNodeSizeActionTypes =
  | SetBlockNodeSize
  | SetBlockNodeWidth
  | SetBlockNodeHeight
  | SetBlockProductNodeSize
  | SetBlockProductNodeWidth
  | SetBlockProductNodeHeight;
