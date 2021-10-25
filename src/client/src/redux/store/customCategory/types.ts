import { LibItem } from "../../../models";

export const ADD_CUSTOM_CATEGORY_NODE = "ADD_CUSTOM_CATEGORY_NODE";
export const REMOVE_CUSTOM_CATEGORY_NODES = "REMOVE_CUSTOM_CATEGORY_NODES";

export interface AddCustomCategoryNode {
  type: typeof ADD_CUSTOM_CATEGORY_NODE;
  payload: {
    node: LibItem;
  };
}

export interface RemoveCustomCategoryNodes {
  type: typeof REMOVE_CUSTOM_CATEGORY_NODES;
  payload: {
    node: null;
  };
}

export type CustomCategoryActionTypes = AddCustomCategoryNode | RemoveCustomCategoryNodes;
