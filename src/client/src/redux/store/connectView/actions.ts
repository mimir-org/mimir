import * as Types from "./types";
import { Node } from "../../../models";

export function addMainNode(node: Node) {
  return {
    type: Types.ADD_MAIN_CONNECT_NODE,
    payload: {
      node,
    },
  };
}

export function removeMainNode(node: Node) {
  return {
    type: Types.REMOVE_MAIN_CONNECT_NODE,
    payload: {
      node,
    },
  };
}

export function removeMainNodes() {
  return {
    type: Types.REMOVE_MAIN_CONNECT_NODES,
    payload: {},
  };
}

export function addConnectNode(mainNode: Node, child: Node) {
  return {
    type: Types.ADD_CONNECT_NODE,
    payload: {
      mainNode,
      child,
    },
  };
}

export function addConnectNodes(mainNode: Node, nodes: Node[]) {
  return {
    type: Types.ADD_CONNECT_NODES,
    payload: {
      mainNode,
      nodes,
    },
  };
}

export function removeConnectNode(mainNode: Node, child: Node) {
  return {
    type: Types.REMOVE_CONNECT_NODE,
    payload: {
      mainNode,
      child,
    },
  };
}

export function removeConnectNodes(node: Node) {
  return {
    type: Types.REMOVE_CONNECT_NODES,
    payload: {
      node,
    },
  };
}
