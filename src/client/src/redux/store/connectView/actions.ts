import { Node } from "../../../models";
import {
  ADD_MAIN_CONNECT_NODE,
  REMOVE_MAIN_CONNECT_NODE,
  REMOVE_MAIN_CONNECT_NODES,
  ADD_CONNECT_NODE,
  ADD_CONNECT_NODES,
  REMOVE_CONNECT_NODE,
  REMOVE_CONNECT_NODES,
} from "./types";

export function addMainNode(node: Node) {
  return {
    type: ADD_MAIN_CONNECT_NODE,
    payload: {
      node,
    },
  };
}

export function removeMainNode(node: Node) {
  return {
    type: REMOVE_MAIN_CONNECT_NODE,
    payload: {
      node,
    },
  };
}

export function removeMainNodes() {
  return {
    type: REMOVE_MAIN_CONNECT_NODES,
    payload: {},
  };
}

export function addConnectNode(mainNode: Node, child: Node) {
  return {
    type: ADD_CONNECT_NODE,
    payload: {
      mainNode,
      child,
    },
  };
}

export function addConnectNodes(mainNode: Node, nodes: Node[]) {
  return {
    type: ADD_CONNECT_NODES,
    payload: {
      mainNode,
      nodes,
    },
  };
}

export function removeConnectNode(mainNode: Node, child: Node) {
  return {
    type: REMOVE_CONNECT_NODE,
    payload: {
      mainNode,
      child,
    },
  };
}

export function removeConnectNodes(node: Node) {
  return {
    type: REMOVE_CONNECT_NODES,
    payload: {
      node,
    },
  };
}
