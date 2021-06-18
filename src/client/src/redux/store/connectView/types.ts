import { Node } from "../../../models";
export const ADD_CONNECT_NODE = "ADD_CONNECT_NODE";
export const ADD_MAIN_CONNECT_NODE = "ADD_MAIN_CONNECT_NODE";
export const REMOVE_CONNECT_NODE = "REMOVE_CONNECT_NODE";
export const REMOVE_ALL_CONNECT_NODES = "REMOVE_ALL_CONNECT_NODES";

export interface AddConnectNode {
  type: typeof ADD_CONNECT_NODE;
  payload: {
    node: Node;
  };
}

export interface RemoveConnectNode {
  type: typeof REMOVE_CONNECT_NODE;
  payload: {
    node: Node;
  };
}

export interface RemoveAllConnectNodes {
  type: typeof REMOVE_ALL_CONNECT_NODES;
}

export interface AddMainConnectNode {
  type: typeof ADD_MAIN_CONNECT_NODE;
  payload: {
    mainNode: Node;
  };
}
