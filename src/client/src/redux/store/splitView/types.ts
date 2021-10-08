import { Node } from "../../../models";
export const SET_SPLITVIEW = "SET_SPLITVIEW";
export const SET_SPLIT_PARENT_NODE = "SET_SPLIT_PARENT_NODE";

export interface SetSplitView {
  type: typeof SET_SPLITVIEW;
  payload: {
    visible: boolean;
  };
}

export interface SetSplitParentNode {
  type: typeof SET_SPLIT_PARENT_NODE;
  payload: {
    node: Node;
  };
}

export type SplitViewActionTypes = SetSplitView | SetSplitParentNode;
