import {
  ADD_ATTRIBUTE_FILTER,
  REMOVE_ALL_ATTRIBUTE_FILTERS,
  REMOVE_ATTRIBUTE_FILTER,
  ParametersActionTypes,
  ADD_COMBINED_ATTRIBUTE,
  REMOVE_COMBINED_ATTRIBUTE,
  ReducerState,
} from "./types";

const initialState: ReducerState = {
  selectedAttributeFilters: {},
};

export function parametersReducer(state = initialState, action: ParametersActionTypes): ReducerState {
  switch (action.type) {
    case ADD_ATTRIBUTE_FILTER: {
      const { nodeId, filterName } = action.payload;

      const selectedAttributeFilters = {
        ...state.selectedAttributeFilters,
        [nodeId]: {
          ...state.selectedAttributeFilters[nodeId],
          [filterName]: [],
        },
      };

      return {
        ...state,
        selectedAttributeFilters,
      };
    }

    case REMOVE_ATTRIBUTE_FILTER: {
      const { nodeId, filterName } = action.payload;
      const { [filterName]: removed, ...filters } = state.selectedAttributeFilters[nodeId];

      const selectedAttributeFilters = {
        ...state.selectedAttributeFilters,
        [nodeId]: filters,
      };

      return {
        ...state,
        selectedAttributeFilters,
      };
    }

    case REMOVE_ALL_ATTRIBUTE_FILTERS: {
      const { nodeId } = action.payload;
      const { [nodeId]: removed, ...selectedAttributeFilters } = state.selectedAttributeFilters;

      return {
        ...state,
        selectedAttributeFilters,
      };
    }

    case ADD_COMBINED_ATTRIBUTE: {
      const { nodeId, filterName, combination } = action.payload;

      const selectedAttributeFilters = {
        ...state.selectedAttributeFilters,
        [nodeId]: {
          ...state.selectedAttributeFilters[nodeId],
          [filterName]: [...state.selectedAttributeFilters[nodeId][filterName], combination],
        },
      };

      return {
        ...state,
        selectedAttributeFilters,
      };
    }

    case REMOVE_COMBINED_ATTRIBUTE: {
      const { nodeId, filterName, combination } = action.payload;

      const combinations = state.selectedAttributeFilters[nodeId][filterName].filter(
        (c) => c.combined !== combination.combined
      );

      const selectedAttributeFilters = {
        ...state.selectedAttributeFilters,
        [nodeId]: {
          ...state.selectedAttributeFilters[nodeId],
          [filterName]: combinations,
        },
      };

      return {
        ...state,
        selectedAttributeFilters,
      };
    }

    default:
      return state;
  }
}
