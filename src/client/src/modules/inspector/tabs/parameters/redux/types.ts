import { Attribute } from "../../../../../models/classes";
export const ADD_ENTITY_PARAMETER = "ADD_ENTITY_PARAMETER";
export const REMOVE_ENTITY_PARAMETERS = "REMOVE_ENTITY_PARAMETERS";
export const REMOVE_ENTITY_PARAMETER = "REMOVE_ENTITY_PARAMETER";

export type AttributeDict = { [nodeId: string]: Attribute[] };

export interface AddEntityParameter {
  type: typeof ADD_ENTITY_PARAMETER;
  payload: { nodeId: string; parameter: Attribute };
}

export interface RemoveEntityParameter {
  type: typeof REMOVE_ENTITY_PARAMETER;
  payload: { nodeId: string; parameter: Attribute };
}

export interface RemoveEntityParameters {
  type: typeof REMOVE_ENTITY_PARAMETERS;
  payload: { nodeId: string };
}

export type ParametersActionTypes =
  | AddEntityParameter
  | RemoveEntityParameter
  | RemoveEntityParameters;
