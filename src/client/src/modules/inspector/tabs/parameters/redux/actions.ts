import { Attribute } from "../../../../../models";
import {
  ADD_ENTITY_PARAMETER,
  REMOVE_ENTITY_PARAMETERS,
  REMOVE_ENTITY_PARAMETER,
} from "./types";

export function addEntityParameter(nodeId: string, parameter: Attribute) {
  return {
    type: ADD_ENTITY_PARAMETER,
    payload: { nodeId, parameter },
  };
}

export function removeEntityParameter(nodeId: string, parameter: Attribute) {
  return {
    type: REMOVE_ENTITY_PARAMETER,
    payload: { nodeId, parameter },
  };
}

export function removeEntityParameters(nodeId: string) {
  return {
    type: REMOVE_ENTITY_PARAMETERS,
    payload: { nodeId },
  };
}
