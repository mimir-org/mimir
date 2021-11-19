import { SET_BLOCKNODE_SIZE } from "./types";

export function setBlockNodeSize(width: number, height: number) {
  return {
    type: SET_BLOCKNODE_SIZE,
    payload: { width, height },
  };
}
