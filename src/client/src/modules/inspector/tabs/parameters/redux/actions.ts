import { Attribute } from "../../../../../models";
import {
  ADD_ENTITY_PARAMETER,
  REMOVE_ENTITY_PARAMETERS,
  REMOVE_ENTITY_PARAMETER,
} from "./types";

export function addEntityParameter(parameter: Attribute) {
  return {
    type: ADD_ENTITY_PARAMETER,
    payload: { parameter },
  };
}

export function removeEntityParameter(parameter: Attribute) {
  return {
    type: REMOVE_ENTITY_PARAMETER,
    payload: { parameter },
  };
}

export function removeEntityParameters() {
  return {
    type: REMOVE_ENTITY_PARAMETERS,
    payload: null,
  };
}
