import { Elements } from "react-flow-renderer";
import { UPDATE_BLOCK_ELEMENTS } from "./types";

export function updateBlockElements(elements: Elements) {
  return {
    type: UPDATE_BLOCK_ELEMENTS,
    payload: elements,
  };
}
