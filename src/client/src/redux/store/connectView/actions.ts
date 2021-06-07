import { Node } from "../../../models/project";
import {
  ADD_CONNECT_NODE,
  ADD_MAIN_CONNECT_NODE,
  REMOVE_ALL_CONNECT_NODES,
  REMOVE_CONNECT_NODE,
} from "./types";

export function addConnectNode(node: Node) {
  return {
    type: ADD_CONNECT_NODE,
    payload: {
      node,
    },
  };
}

export function removeConnectNode(node: Node) {
  return {
    type: REMOVE_CONNECT_NODE,
    payload: {
      node,
    },
  };
}

export function removeAllConnectNodes() {
  return {
    type: REMOVE_ALL_CONNECT_NODES,
  };
}

export function addMainConnectNode(mainNode: Node) {
  return {
    type: ADD_MAIN_CONNECT_NODE,
    payload: {
      mainNode,
    },
  };
}
