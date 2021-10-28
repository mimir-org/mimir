export const SET_BLOCKNODE_SIZE = "SET_BLOCKNODE_SIZE";

export interface SetBlockNodeSize {
  type: typeof SET_BLOCKNODE_SIZE;
  payload: {
    width: number;
  };
}

export type BlockNodeSizeActionTypes = SetBlockNodeSize;
