import { UPDATE_BLOCK_ELEMENTS } from "./types";

export function updateBlockElements(elements: any[]) {
  return {
    type: UPDATE_BLOCK_ELEMENTS,
    payload: elements,
  };
}
