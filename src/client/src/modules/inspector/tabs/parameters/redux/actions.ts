import { Attribute } from "../../../../../models";
import { SELECT_ENTITY_PARAMETER } from "./types";

export function selectEntityParameter(parameter: Attribute) {
  return {
    type: SELECT_ENTITY_PARAMETER,
    payload: { parameter },
  };
}
