import { Attribute } from "../../../../../models/classes";
export const ADD_ENTITY_PARAMETER = "ADD_ENTITY_PARAMETER";
export const REMOVE_ENTITY_PARAMETERS = "REMOVE_ENTITY_PARAMETERS";
export const REMOVE_ENTITY_PARAMETER = "REMOVE_ENTITY_PARAMETER";

export interface AddEntityParameter {
  type: typeof ADD_ENTITY_PARAMETER;
  payload: { parameter: Attribute };
}

export interface RemoveEntityParameter {
  type: typeof REMOVE_ENTITY_PARAMETER;
  payload: { parameter: Attribute };
}

export interface RemoveEntityParameters {
  type: typeof REMOVE_ENTITY_PARAMETERS;
  payload: null;
}

export type ParametersActionTypes =
  | AddEntityParameter
  | RemoveEntityParameter
  | RemoveEntityParameters;
