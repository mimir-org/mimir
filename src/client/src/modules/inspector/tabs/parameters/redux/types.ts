export const ADD_ENTITY_PARAMETER = "ADD_ENTITY_PARAMETER";
export const REMOVE_ENTITY_PARAMETERS = "REMOVE_ENTITY_PARAMETERS";
export const REMOVE_ENTITY_PARAMETER = "REMOVE_ENTITY_PARAMETER";

export type AttributeIdDict = { [nodeId: string]: string[] };

export interface AddEntityParameter {
  type: typeof ADD_ENTITY_PARAMETER;
  payload: { nodeId: string; parameterId: string };
}

export interface RemoveEntityParameter {
  type: typeof REMOVE_ENTITY_PARAMETER;
  payload: { nodeId: string; parameterId: string };
}

export interface RemoveEntityParameters {
  type: typeof REMOVE_ENTITY_PARAMETERS;
  payload: { nodeId: string };
}

export type ParametersActionTypes =
  | AddEntityParameter
  | RemoveEntityParameter
  | RemoveEntityParameters;
