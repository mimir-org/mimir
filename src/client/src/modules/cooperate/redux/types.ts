import { Node, Edge } from "@mimirorg/modelbuilder-types";

export const COOPERATE_ADD_NODE = "COOPERATE_ADD_NODE";
export const COOPERATE_ADD_EDGE = "COOPERATE_ADD_EDGE";

interface CooperateAddNode {
  type: typeof COOPERATE_ADD_NODE;
  payload: Node;
}

interface CooperateAddEdge {
  type: typeof COOPERATE_ADD_EDGE;
  payload: Edge;
}

export type CooperateActionTypes = CooperateAddNode | CooperateAddEdge;
