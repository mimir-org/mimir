import { LibraryCategory } from "../../../models/project";
import {
  AddCustomCategoryNode,
  ADD_CUSTOM_CATEGORY_NODE,
  REMOVE_CUSTOM_CATEGORY_NODES,
  REMOVE_CUSTOM_CATEGORY_NODE,
} from "./types";

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

  if (action.type === REMOVE_CUSTOM_CATEGORY_NODE) {
    return {
      ...state,
      nodes: state.nodes.filter((n) => n.id !== action.payload.node.id),
    };
  }

  if (action.type === REMOVE_CUSTOM_CATEGORY_NODES) {
    return {
      ...state,
      nodes: [],
    };
  } else return state;
}
