import { Attribute } from "../../../../../models";
import {
  ADD_ENTITY_PARAMETER,
  REMOVE_ENTITY_PARAMETERS,
  REMOVE_ENTITY_PARAMETER,
  ParametersActionTypes,
} from "./types";

const initialState = {
  attributes: [] as Attribute[],
};

export const parametersReducer = (
  state = initialState,
  action: ParametersActionTypes
) => {
  switch (action.type) {
    case ADD_ENTITY_PARAMETER:
      return {
        ...state,
        attributes: [...state.attributes, action.payload.parameter],
      };

    case REMOVE_ENTITY_PARAMETER:
      return {
        ...state,
        attributes: state.attributes.filter(
          (x) => x.id !== action.payload.parameter.id
        ),
      };

    case REMOVE_ENTITY_PARAMETERS:
      return {
        ...state,
        attributes: [],
      };

    default:
      return state;
  }
};

export default parametersReducer;
