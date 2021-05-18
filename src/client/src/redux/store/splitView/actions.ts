import { Node } from "../../../models/project";
import { CHANGE_SPLITVIEW, SET_SPLITVIEW_NODE } from "./types";

export function changeSplitView(visible: boolean) {
  return {
    type: CHANGE_SPLITVIEW,
    payload: {
      visible,
    },
  };
}

export function setSplitViewNode(node: Node) {
  return {
    type: SET_SPLITVIEW_NODE,
    payload: {
      node,
    },
  };
}
