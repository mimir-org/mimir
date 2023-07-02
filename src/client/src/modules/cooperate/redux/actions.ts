import { AspectObject, Connection } from "lib";
import * as Types from "./types";

export function cooperateAddNode(node: AspectObject): Types.CooperateActionTypes {
  return {
    type: Types.COOPERATE_ADD_NODE,
    payload: node,
  };
}

export function cooperateAddEdge(edge: Connection): Types.CooperateActionTypes {
  return {
    type: Types.COOPERATE_ADD_EDGE,
    payload: edge,
  };
}
