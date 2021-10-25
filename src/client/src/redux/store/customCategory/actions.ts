import { LibItem } from "../../../models";
import { ADD_CUSTOM_CATEGORY_NODE, REMOVE_CUSTOM_CATEGORY_NODES } from "./types";

export function addCustomCategoryNode(node: LibItem) {
  return {
    type: ADD_CUSTOM_CATEGORY_NODE,
    payload: {
      node,
    },
  };
}

export function removeCustomCategoryNodes() {
  return {
    type: REMOVE_CUSTOM_CATEGORY_NODES,
    payload: null,
  };
}
