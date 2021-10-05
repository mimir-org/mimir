import {
  CHANGE_ACTIVE_MENU,
  SET_ACCOUNT_MENU_VISIBILITY,
  MenuActionTypes,
  MenuState,
  SET_FILTER_MENU_VISIBILITY,
} from "./types";

const initialState: MenuState = {
  accountMenuVisibility: false,
  filterMenuVisibility: false,
  activeMenu: null,
};

export function menuReducer(state = initialState, action: MenuActionTypes): MenuState {
  switch (action.type) {
    case CHANGE_ACTIVE_MENU: {
      return {
        ...state,
        activeMenu: action.payload.key,
      };
    }

    case SET_ACCOUNT_MENU_VISIBILITY:
      return {
        ...state,
        accountMenuVisibility: action.payload.visibility,
      };

    case SET_FILTER_MENU_VISIBILITY:
      return {
        ...state,
        filterMenuVisibility: action.payload.visibility,
      };

    default:
      return state;
  }
}
