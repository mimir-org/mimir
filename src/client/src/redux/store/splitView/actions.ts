import { Node } from "../../../models";
import { SET_SPLITVIEW, SET_SPLIT_NODE } from "./types";

export function setSplitView(visible: boolean) {
  return {
    type: SET_SPLITVIEW,
    payload: {
      visible,
    },
  };
}

export function setNode(node: Node) {
  return {
    type: SET_SPLIT_NODE,
    payload: {
      node,
    },
  };
}
