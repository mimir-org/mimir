import { CombinedAttribute } from "../../../../../models";
import {
  AddAllAttributeFilters,
  AddAttributeFilter,
  AddCombinedAttribute,
  ADD_ALL_ATTRIBUTE_FILTERS,
  ADD_ATTRIBUTE_FILTER,
  ADD_COMBINED_ATTRIBUTE,
  RemoveAllAttributeFilters,
  RemoveAttributeFilter,
  RemoveCombinedAttribute,
  REMOVE_ALL_ATTRIBUTE_FILTERS,
  REMOVE_ATTRIBUTE_FILTER,
  REMOVE_COMBINED_ATTRIBUTE,
} from "./types";

export function addAttributeFilter(elementId: string, filterName: string): AddAttributeFilter {
  return {
    type: ADD_ATTRIBUTE_FILTER,
    payload: { elementId, filterName },
  };
}

export function removeAttributeFilter(elementId: string, filterName: string): RemoveAttributeFilter {
  return {
    type: REMOVE_ATTRIBUTE_FILTER,
    payload: { elementId, filterName },
  };
}

export function addAllAttributeFilters(elementId: string, filterNames: string[]): AddAllAttributeFilters {
  return {
    type: ADD_ALL_ATTRIBUTE_FILTERS,
    payload: { elementId, filterNames },
  };
}

export function removeAllAttributeFilters(elementId: string): RemoveAllAttributeFilters {
  return {
    type: REMOVE_ALL_ATTRIBUTE_FILTERS,
    payload: { elementId },
  };
}

export function addCombinedAttribute(
  elementId: string,
  filterName: string,
  combination: CombinedAttribute
): AddCombinedAttribute {
  return {
    type: ADD_COMBINED_ATTRIBUTE,
    payload: { elementId, filterName, combination },
  };
}

export function removeCombinedAttribute(
  elementId: string,
  filterName: string,
  combination: CombinedAttribute
): RemoveCombinedAttribute {
  return {
    type: REMOVE_COMBINED_ATTRIBUTE,
    payload: { elementId, filterName, combination },
  };
}
