import { CombinedAttribute } from "../../../../../models";
import {
  ADD_ATTRIBUTE_FILTER,
  ADD_COMBINED_ATTRIBUTE,
  REMOVE_ALL_ATTRIBUTE_FILTERS,
  REMOVE_ATTRIBUTE_FILTER,
  REMOVE_COMBINED_ATTRIBUTE,
} from "./types";

export function addAttributeFilter(nodeId: string, filterName: string) {
  return {
    type: ADD_ATTRIBUTE_FILTER,
    payload: { nodeId, filterName },
  };
}

export function removeAttributeFilter(nodeId: string, filterName: string) {
  return {
    type: REMOVE_ATTRIBUTE_FILTER,
    payload: { nodeId, filterName },
  };
}

export function removeAllAttributeFilters(nodeId: string) {
  return {
    type: REMOVE_ALL_ATTRIBUTE_FILTERS,
    payload: { nodeId },
  };
}

export function addCombinedAttribute(
  nodeId: string,
  filterName: string,
  combination: CombinedAttribute
) {
  return {
    type: ADD_COMBINED_ATTRIBUTE,
    payload: { nodeId, filterName, combination },
  };
}

export function removeCombinedAttribute(
  nodeId: string,
  filterName: string,
  combination: CombinedAttribute
) {
  return {
    type: REMOVE_COMBINED_ATTRIBUTE,
    payload: { nodeId, filterName, combination },
  };
}
