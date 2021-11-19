import { Node } from "../../../models";

export const COOPERATE_ADD_NODE = "COOPERATE_ADD_NODE";

interface CooperateAddNode {
  type: typeof COOPERATE_ADD_NODE;
  payload: Node;
}

export type CooperateActionTypes = CooperateAddNode;
