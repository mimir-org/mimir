import { CHANGE_ACTIVE_MENU, SET_ACCOUNT_MENU_VISIBILITY, SET_FILTER_MENU_VISIBILITY } from "./types";

export function setAccountMenuVisibility(visibility: boolean) {
  return {
    type: SET_ACCOUNT_MENU_VISIBILITY,
    payload: {
      visibility,
    },
  };
}

export function setFilterMenuVisibility(visibility: boolean) {
  return {
    type: SET_FILTER_MENU_VISIBILITY,
    payload: {
      visibility,
    },
  };
}

export function changeActiveMenu(key: string) {
  return {
    type: CHANGE_ACTIVE_MENU,
    payload: {
      key,
    },
  };
}
