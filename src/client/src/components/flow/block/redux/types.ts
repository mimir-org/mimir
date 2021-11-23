export const SET_BLOCKNODE_SIZE = "SET_BLOCKNODE_SIZE";
export const SET_BLOCKNODE_WIDTH = "SET_BLOCKNODE_WIDTH";
export const SET_BLOCKNODE_HEIGHT = "SET_BLOCKNODE_HEIGHT";

export interface SetBlockNodeSize {
  type: typeof SET_BLOCKNODE_SIZE;
  payload: {
    width: number;
    height: number;
  };
}

export interface SetBlockNodeHeight {
  type: typeof SET_BLOCKNODE_HEIGHT;
  payload: {
    height: number;
  };
}

export interface SetBlockNodeWidth {
  type: typeof SET_BLOCKNODE_WIDTH;
  payload: {
    width: number;
  };
}

export type BlockNodeSizeActionTypes = SetBlockNodeSize;
