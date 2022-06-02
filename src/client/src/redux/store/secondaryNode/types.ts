import { Node } from "../../../models";
export const SET_SECONDARY_NODE = "SET_SECONDARY_NODE";
export const REMOVE_SECONDARY_NODE = "REMOVE_SECONDARY_NODE";

export interface SetSecondaryNode {
  type: typeof SET_SECONDARY_NODE;
  payload: { node: Node };
}

export interface RemoveSecondaryNode {
  type: typeof REMOVE_SECONDARY_NODE;
  payload: null;
}

export type SecondaryActionTypes = SetSecondaryNode | RemoveSecondaryNode;
