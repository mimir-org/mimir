import { AspectObject, Connection } from "lib";

export const COOPERATE_ADD_NODE = "COOPERATE_ADD_NODE";
export const COOPERATE_ADD_EDGE = "COOPERATE_ADD_EDGE";

interface CooperateAddNode {
  type: typeof COOPERATE_ADD_NODE;
  payload: AspectObject;
}

interface CooperateAddEdge {
  type: typeof COOPERATE_ADD_EDGE;
  payload: Connection;
}

export type CooperateActionTypes = CooperateAddNode | CooperateAddEdge;
