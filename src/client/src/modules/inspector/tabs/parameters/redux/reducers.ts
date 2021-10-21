import {
  ADD_ATTRIBUTE_FILTER,
  REMOVE_ALL_ATTRIBUTE_FILTERS,
  REMOVE_ATTRIBUTE_FILTER,
  ParametersActionTypes,
  ADD_COMBINED_ATTRIBUTE,
  REMOVE_COMBINED_ATTRIBUTE,
  ReducerState,
  ADD_ALL_ATTRIBUTE_FILTERS,
} from "./types";

const initialState: ReducerState = {
  selectedAttributeFilters: {},
};

export function parametersReducer(state = initialState, action: ParametersActionTypes): ReducerState {
  switch (action.type) {
    case ADD_ATTRIBUTE_FILTER: {
      const { elementId, filterName } = action.payload;

      const selectedAttributeFilters = {
        ...state.selectedAttributeFilters,
        [elementId]: {
          ...state.selectedAttributeFilters[elementId],
          [filterName]: [],
        },
      };

      return {
        ...state,
        selectedAttributeFilters,
      };
    }

    case ADD_ALL_ATTRIBUTE_FILTERS: {
      const { elementId, filterNames } = action.payload;

      const allFilters = {};

      filterNames.forEach((filterName) => (allFilters[filterName] = []));

      const selectedAttributeFilters = {
        ...state.selectedAttributeFilters,
        [elementId]: allFilters,
      };

      return {
        ...state,
        selectedAttributeFilters,
      };
    }

    case REMOVE_ATTRIBUTE_FILTER: {
      const { elementId, filterName } = action.payload;
      const { [filterName]: removed, ...filters } = state.selectedAttributeFilters[elementId];

      const selectedAttributeFilters = {
        ...state.selectedAttributeFilters,
        [elementId]: filters,
      };

      return {
        ...state,
        selectedAttributeFilters,
      };
    }

    case REMOVE_ALL_ATTRIBUTE_FILTERS: {
      const { elementId } = action.payload;
      const { [elementId]: removed, ...selectedAttributeFilters } = state.selectedAttributeFilters;

      return {
        ...state,
        selectedAttributeFilters,
      };
    }

    case ADD_COMBINED_ATTRIBUTE: {
      const { elementId, filterName, combination } = action.payload;

      const selectedAttributeFilters = {
        ...state.selectedAttributeFilters,
        [elementId]: {
          ...state.selectedAttributeFilters[elementId],
          [filterName]: [...state.selectedAttributeFilters[elementId][filterName], combination],
        },
      };

      return {
        ...state,
        selectedAttributeFilters,
      };
    }

    case REMOVE_COMBINED_ATTRIBUTE: {
      const { elementId, filterName, combination } = action.payload;

      const combinations = state.selectedAttributeFilters[elementId][filterName].filter(
        (c) => c.combined !== combination.combined
      );

      const selectedAttributeFilters = {
        ...state.selectedAttributeFilters,
        [elementId]: {
          ...state.selectedAttributeFilters[elementId],
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
