import { Node } from "../../../models";
import { SET_SECONDARY_NODE } from "./types";

export function setSecondaryNode(node: Node) {
  return {
    type: SET_SECONDARY_NODE,
    payload: { node },
  };
}
