import { ReducerState, AttributeFilter, AttributeFilters, CombinedAttributeFilter } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialParametersState: ReducerState = {
  selectedAttributeFilters: {},
};

export const parametersSlice = createSlice({
  name: 'parameters',
  initialState: initialParametersState,
  reducers: {
    addAttributeFilter: (state, action: PayloadAction<AttributeFilter>) => {
      const { elementId, filterName } = action.payload;

      state.selectedAttributeFilters = {
        ...state.selectedAttributeFilters,
        [elementId]: {
          ...state.selectedAttributeFilters[elementId],
          [filterName]: [],
        },
      };
    },
    removeAttributeFilter: (state, action: PayloadAction<AttributeFilter>) => {
      const { elementId, filterName } = action.payload;
      const { [filterName]: removed, ...filters } = state.selectedAttributeFilters[elementId];

      state.selectedAttributeFilters = {
        ...state.selectedAttributeFilters,
        [elementId]: filters,
      };
    },
    addAllAttributeFilters: (state, action: PayloadAction<AttributeFilters>) => {
      const { elementId, filterNames } = action.payload;
      const allFilters = {};
      filterNames.forEach((filterName) => (allFilters[filterName] = []));

      state.selectedAttributeFilters = {
        ...state.selectedAttributeFilters,
        [elementId]: allFilters,
      };
    },
    removeAllAttributeFilters: (state, action: PayloadAction<string>) => {
      const { [action.payload]: removed, ...selectedAttributeFilters } = state.selectedAttributeFilters;
      state.selectedAttributeFilters = selectedAttributeFilters;
    },
    addCombinedAttribute: (state, action: PayloadAction<CombinedAttributeFilter>) => {
      const { elementId, filterName, combination } = action.payload;

      state.selectedAttributeFilters = {
        ...state.selectedAttributeFilters,
        [elementId]: {
          ...state.selectedAttributeFilters[elementId],
          [filterName]: [...state.selectedAttributeFilters[elementId][filterName], combination],
        },
      };
    },
    removeCombinedAttribute: (state, action: PayloadAction<CombinedAttributeFilter>) => {
      const { elementId, filterName, combination } = action.payload;

      const combinations = state.selectedAttributeFilters[elementId][filterName].filter(
        (c) => c.combined !== combination.combined
      );

      state.selectedAttributeFilters = {
        ...state.selectedAttributeFilters,
        [elementId]: {
          ...state.selectedAttributeFilters[elementId],
          [filterName]: combinations,
        },
      };
    },
  }
});

export const {
  addAttributeFilter,
  removeAttributeFilter,
  addAllAttributeFilters,
  removeAllAttributeFilters,
  addCombinedAttribute,
  removeCombinedAttribute
} = parametersSlice.actions;

export default parametersSlice.reducer;