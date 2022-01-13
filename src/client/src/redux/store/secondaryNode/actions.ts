import { Node } from "../../../models";
import { REMOVE_SECONDARY_NODE, SET_SECONDARY_NODE } from "./types";

export function setSecondaryNode(node: Node) {
  return {
    type: SET_SECONDARY_NODE,
    payload: {
      node,
    },
  };
}

export function removeSecondaryNode() {
  return {
    type: REMOVE_SECONDARY_NODE,
    payload: null,
  };
}
