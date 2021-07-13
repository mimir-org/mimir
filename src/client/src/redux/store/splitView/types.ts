import { Node } from "../../../models";
export const SET_SPLITVIEW = "SET_SPLITVIEW";
export const SET_SPLIT_NODE = "SET_SPLIT_NODE";

export interface SetSplitView {
  type: typeof SET_SPLITVIEW;
  payload: {
    visible: boolean;
  };
}

export interface SetSplitNode {
  type: typeof SET_SPLIT_NODE;
  payload: {
    node: Node;
  };
}

export type SplitViewActionTypes = SetSplitView | SetSplitNode;
