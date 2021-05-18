import { Node } from "../../../models/project";
export const CHANGE_SPLITVIEW = "CHANGE_SPLITVIEW";
export const SET_SPLITVIEW_NODE = "SET_SPLITVIEW_NODE";

export interface ChangeSplitView {
  type: typeof CHANGE_SPLITVIEW;
  payload: {
    visible: boolean;
  };
}

export interface SetSplitViewNode {
  type: typeof SET_SPLITVIEW_NODE;
  payload: {
    node: Node;
  };
}
