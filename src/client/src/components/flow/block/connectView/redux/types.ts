import { Node } from "../../../../../models";
export const ADD_MAIN_CONNECT_NODE = "ADD_MAIN_CONNECT_NODE";
export const REMOVE_MAIN_CONNECT_NODE = "REMOVE_MAIN_CONNECT_NODE";
export const REMOVE_MAIN_CONNECT_NODES = "REMOVE_MAIN_CONNECT_NODES";

export const ADD_CONNECT_NODE = "ADD_CONNECT_NODE";
export const ADD_CONNECT_NODES = "ADD_CONNECT_NODES";
export const REMOVE_CONNECT_NODE = "REMOVE_CONNECT_NODE";
export const REMOVE_CONNECT_NODES = "REMOVE_CONNECT_NODES";

export interface AddMainConnectNode {
  type: typeof ADD_MAIN_CONNECT_NODE;
  payload: {
    node: Node;
  };
}

export interface RemoveMainConnectNode {
  type: typeof REMOVE_MAIN_CONNECT_NODE;
  payload: {
    node: Node;
  };
}

export interface RemoveMainConnectNodes {
  type: typeof REMOVE_MAIN_CONNECT_NODES;
  payload: {};
}

export interface AddConnectNode {
  type: typeof ADD_CONNECT_NODE;
  payload: {
    mainNode: Node;
    child: Node;
  };
}

export interface AddConnectNodes {
  type: typeof ADD_CONNECT_NODES;
  payload: {
    mainNode: Node;
    nodes: Node[];
  };
}

export interface RemoveConnectNode {
  type: typeof REMOVE_CONNECT_NODE;
  payload: {
    mainNode: Node;
    child: Node;
  };
}

export interface RemoveConnectNodes {
  type: typeof REMOVE_CONNECT_NODES;
  payload: {
    node: Node;
  };
}

export type ConnectViewActionTypes =
  | AddMainConnectNode
  | RemoveMainConnectNodes
  | RemoveMainConnectNode
  | AddConnectNode
  | AddConnectNodes
  | RemoveConnectNode
  | RemoveConnectNodes;
