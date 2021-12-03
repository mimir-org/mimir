import * as Types from "./types";

const initialState: Types.MenuState = {
  projectMenuVisibility: false,
  userMenuVisibility: false,
  filterMenuVisibility: false,
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

    case Types.SET_FILTER_MENU_VISIBILITY:
      return {
        ...state,
        filterMenuVisibility: action.payload.visibility,
      };

    default:
      return state;
  }
}
