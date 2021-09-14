import { Attribute } from "../../../../../models/classes";
export const SELECT_ENTITY_PARAMETER = "SELECT_ENTITY_PARAMETER";

export interface SelectEntityParameter {
  type: typeof SELECT_ENTITY_PARAMETER;
  payload: { parameter: Attribute };
}

export type ParametersActionTypes = SelectEntityParameter;
