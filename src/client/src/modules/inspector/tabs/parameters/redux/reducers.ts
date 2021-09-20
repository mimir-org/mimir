import { RemoveEntryIfEmpty } from "../helpers";
import {
  ADD_ENTITY_PARAMETER,
  REMOVE_ENTITY_PARAMETERS,
  REMOVE_ENTITY_PARAMETER,
  ParametersActionTypes,
  AttributeIdDict,
} from "./types";

const initialState: { attributes: AttributeIdDict } = {
  attributes: {},
};

export const parametersReducer = (
  state = initialState,
  action: ParametersActionTypes
) => {
  switch (action.type) {
    case ADD_ENTITY_PARAMETER: {
      const { nodeId, parameterId } = action.payload;

      let attributes = {
        ...state.attributes,
        [nodeId]: [...(state.attributes[nodeId] ?? []), parameterId],
      };

      return {
        ...state,
        attributes,
      };
    }

    case REMOVE_ENTITY_PARAMETER: {
      const { nodeId, parameterId } = action.payload;

      let attributes = {
        ...state.attributes,
        [nodeId]: [
          ...state.attributes[nodeId].filter((x) => x !== parameterId),
        ],
      };

      attributes = RemoveEntryIfEmpty(nodeId, attributes);

      return {
        ...state,
        attributes,
      };
    }

    case REMOVE_ENTITY_PARAMETERS: {
      const { nodeId } = action.payload;

      const { [nodeId]: removed, ...remainder } = state.attributes;

      let attributes = {
        ...remainder,
      };

      return {
        ...state,
        attributes,
      };
    }

    default:
      return state;
  }
};

export default parametersReducer;
