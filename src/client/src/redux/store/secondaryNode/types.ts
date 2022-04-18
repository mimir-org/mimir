import { Node } from "../../../models";
export const SET_SECONDARY_NODE = "SET_SECONDARY_NODE";

export interface SetSecondaryNode {
  type: typeof SET_SECONDARY_NODE;
  payload: { node: Node };
}

export type SecondaryActionTypes = SetSecondaryNode;
