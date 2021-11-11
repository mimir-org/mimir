import * as Types from "./types";

const initialState: Types.MenuState = {
  projectMenuVisibility: false,
  userMenuVisibility: false,
  treeFilterMenuVisibility: false,
  blockFilterMenuVisibility: false,
  activeMenu: null,
};

export function menuReducer(state = initialState, action: Types.MenuActionTypes): Types.MenuState {
  switch (action.type) {
    case Types.CHANGE_ACTIVE_MENU: {
      return {
        ...state,
        activeMenu: action.payload.key,
      };
    }

    case Types.SET_PROJECT_MENU_VISIBILITY:
      return {
        ...state,
        projectMenuVisibility: action.payload.visibility,
      };

    case Types.SET_USER_MENU_VISIBILITY:
      return {
        ...state,
        userMenuVisibility: action.payload.visibility,
      };

    case Types.SET_TREE_FILTER_MENU_VISIBILITY:
      return {
        ...state,
        treeFilterMenuVisibility: action.payload.visibility,
      };

    case Types.SET_BLOCK_FILTER_MENU_VISIBILITY:
      return {
        ...state,
        blockFilterMenuVisibility: action.payload.visibility,
      };

    default:
      return state;
  }
}
