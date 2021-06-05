import { Node } from "../../../models/project";
export const ADD_CONNECT_NODE = "ADD_CONNECT_NODE";
export const ADD_MAIN_CONNECT_NODE = "ADD_MAIN_CONNECT_NODE";
export const REMOVE_CONNECT_NODE = "REMOVE_CONNECT_NODE";

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

export interface AddMainConnectNode {
  type: typeof ADD_MAIN_CONNECT_NODE;
  payload: {
    mainNode: Node;
  };
}
