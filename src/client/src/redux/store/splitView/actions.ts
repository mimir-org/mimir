import { Node } from "../../../models";
import { SET_SPLITVIEW, SET_SPLIT_PARENT_NODE } from "./types";

export function setSplitView(visible: boolean) {
  return {
    type: SET_SPLITVIEW,
    payload: {
      visible,
    },
  };
}

export function setSplitParentNode(node: Node) {
  return {
    type: SET_SPLIT_PARENT_NODE,
    payload: {
      node,
    },
  };
}
