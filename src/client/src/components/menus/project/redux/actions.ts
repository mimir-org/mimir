import {
  CHANGE_ACTIVE_MENU,
  SET_ACCOUNT_MENU_VISIBILITY,
  SET_TREE_FILTER_MENU_VISIBILITY,
  SET_BLOCK_FILTER_MENU_VISIBILITY,
} from "./types";

export function setAccountMenuVisibility(visibility: boolean) {
  return {
    type: SET_ACCOUNT_MENU_VISIBILITY,
    payload: {
      visibility,
    },
  };
}

export function setTreeFilterMenuVisibility(visibility: boolean) {
  return {
    type: SET_TREE_FILTER_MENU_VISIBILITY,
    payload: {
      visibility,
    },
  };
}

export function setBlockFilterMenuVisibility(visibility: boolean) {
  return {
    type: SET_BLOCK_FILTER_MENU_VISIBILITY,
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
