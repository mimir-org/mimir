import { CHANGE_ACTIVE_MENU, SET_PROJECT_MENU_VISIBILITY, SET_USER_MENU_VISIBILITY, SET_FILTER_MENU_VISIBILITY } from "./types";

export function setProjectMenuVisibility(visibility: boolean) {
  return {
    type: SET_PROJECT_MENU_VISIBILITY,
    payload: {
      visibility,
    },
  };
}

export function setUserMenuVisibility(visibility: boolean) {
  return {
    type: SET_USER_MENU_VISIBILITY,
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
