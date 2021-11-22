import { SET_BLOCKNODE_HEIGHT, SET_BLOCKNODE_SIZE, SET_BLOCKNODE_WIDTH } from "./types";

export function setBlockNodeSize(width: number, height: number) {
  return {
    type: SET_BLOCKNODE_SIZE,
    payload: { width, height },
  };
}

export function setBlockNodeWidth(width: number) {
  return {
    type: SET_BLOCKNODE_WIDTH,
    payload: { width },
  };
}

export function setBlockNodeHeight(height: number) {
  return {
    type: SET_BLOCKNODE_HEIGHT,
    payload: { height },
  };
}
