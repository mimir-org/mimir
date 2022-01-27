import { Edge, Node } from "../../../models";
import * as Types from "./types";

export function cooperateAddNode(node: Node): Types.CooperateActionTypes {
  return {
    type: Types.COOPERATE_ADD_NODE,
    payload: node,
  };
}

export function cooperateAddEdge(edge: Edge): Types.CooperateActionTypes {
  return {
    type: Types.COOPERATE_ADD_EDGE,
    payload: edge,
  };
}
