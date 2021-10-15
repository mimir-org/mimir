import { CombinedAttribute } from "../../../../../models";

export const ADD_ATTRIBUTE_FILTER = "ADD_ATTRIBUTE_FILTER";
export const REMOVE_ATTRIBUTE_FILTER = "REMOVE_ATTRIBUTE_FILTER";
export const REMOVE_ALL_ATTRIBUTE_FILTERS = "REMOVE_ALL_ATTRIBUTE_FILTERS";
export const ADD_COMBINED_ATTRIBUTE = "ADD_COMBINED_ATTRIBUTE";
export const REMOVE_COMBINED_ATTRIBUTE = "REMOVE_COMBINED_ATTRIBUTE";

export type ReducerState = {
  selectedAttributeFilters: AttributeDict;
};

export type AttributeDict = {
  [elementId: string]: FilterDict;
};

export type FilterDict = { [filterName: string]: CombinedAttribute[] };

export interface AddAttributeFilter {
  type: typeof ADD_ATTRIBUTE_FILTER;
  payload: { elementId: string; filterName: string };
}

export interface RemoveAttributeFilter {
  type: typeof REMOVE_ATTRIBUTE_FILTER;
  payload: { elementId: string; filterName: string };
}

export interface RemoveAllAttributeFilters {
  type: typeof REMOVE_ALL_ATTRIBUTE_FILTERS;
  payload: { elementId: string };
}

export interface AddCombinedAttribute {
  type: typeof ADD_COMBINED_ATTRIBUTE;
  payload: {
    elementId: string;
    filterName: string;
    combination: CombinedAttribute;
  };
}

export interface RemoveCombinedAttribute {
  type: typeof REMOVE_COMBINED_ATTRIBUTE;
  payload: {
    elementId: string;
    filterName: string;
    combination: CombinedAttribute;
  };
}

export type ParametersActionTypes =
  | AddAttributeFilter
  | RemoveAttributeFilter
  | RemoveAllAttributeFilters
  | AddCombinedAttribute
  | RemoveCombinedAttribute;
