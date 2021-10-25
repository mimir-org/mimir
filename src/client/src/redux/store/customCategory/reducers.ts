import { LibraryCategory } from "../../../models/project";
import { ADD_CUSTOM_CATEGORY_NODE, AddCustomCategoryNode, REMOVE_CUSTOM_CATEGORY_NODES } from "./types";

const initialState = {
  name: "Favorites",
  nodes: [],
} as LibraryCategory;

export function customCategoryReducer(state = initialState, action: AddCustomCategoryNode) {
  if (action.type === ADD_CUSTOM_CATEGORY_NODE) {
    return {
      ...state,
      nodes: [...state.nodes, action.payload.node],
    };
  }

  if (action.type === REMOVE_CUSTOM_CATEGORY_NODES) {
    return {
      ...state,
      nodes: [],
    };
  } else return state;
}
