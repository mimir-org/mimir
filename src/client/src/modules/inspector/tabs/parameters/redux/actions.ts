import {
  ADD_ENTITY_PARAMETER,
  REMOVE_ENTITY_PARAMETERS,
  REMOVE_ENTITY_PARAMETER,
} from "./types";

export function addEntityParameter(nodeId: string, parameterId: string) {
  return {
    type: ADD_ENTITY_PARAMETER,
    payload: { nodeId, parameterId },
  };
}

export function removeEntityParameter(nodeId: string, parameterId: string) {
  return {
    type: REMOVE_ENTITY_PARAMETER,
    payload: { nodeId, parameterId },
  };
}

export function removeEntityParameters(nodeId: string) {
  return {
    type: REMOVE_ENTITY_PARAMETERS,
    payload: { nodeId },
  };
}
