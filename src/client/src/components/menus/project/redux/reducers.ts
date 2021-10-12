import * as Types from "./types";

const initialState: Types.MenuState = {
  accountMenuVisibility: false,
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

    case Types.SET_ACCOUNT_MENU_VISIBILITY:
      return {
        ...state,
        accountMenuVisibility: action.payload.visibility,
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
