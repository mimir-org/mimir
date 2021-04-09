import {
  FETCHING_PROJECT,
  CREATING_PROJECT,
  ADD_NODE,
  REMOVE_NODE,
  ADD_EDGE,
  REMOVE_EDGE,
  UPDATE_POSITION,
  CHANGE_NODE_VISIBILITY,
  CHANGE_EDGE_VISIBILITY,
  ProjectActionTypes,
} from "./types";

import { Node, Edge, NODE_TYPE } from "../../../models/project";

export function get(id: string): ProjectActionTypes {
  return {
    type: FETCHING_PROJECT,
    payload: id,
  };
}

export function create(): ProjectActionTypes {
  return {
    type: CREATING_PROJECT,
    payload: null,
  };
}

export function addNode(node: Node): ProjectActionTypes {
  return {
    type: ADD_NODE,
    payload: node,
  };
}

export function removeNode(nodeId: string): ProjectActionTypes {
  return {
    type: REMOVE_NODE,
    payload: nodeId,
  };
}

export function createEdge(edge: Edge): ProjectActionTypes {
  return {
    type: ADD_EDGE,
    payload: edge,
  };
}

export function removeEdge(edgeId: string): ProjectActionTypes {
  return {
    type: REMOVE_EDGE,
    payload: edgeId,
  };
}

export function updatePosition(
  nodeId: string,
  x: number,
  y: number
): ProjectActionTypes {
  return {
    type: UPDATE_POSITION,
    payload: {
      nodeId: nodeId,
      x: x,
      y: y,
    },
  };
}

export function changeNodeVisibility(
  nodeId: string,
  isHidden: boolean,
  isAspect: boolean,
  type: typeof NODE_TYPE
) {
  return {
    type: CHANGE_NODE_VISIBILITY,
    payload: { nodeId, isHidden, isAspect, type },
  };
}

export function changeEdgeVisibility(edgeId: string, isHidden: boolean) {
  return {
    type: CHANGE_EDGE_VISIBILITY,
    payload: { edgeId, isHidden: isHidden },
  };
}
