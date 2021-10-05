export const CHANGE_ACTIVE_MENU = "CHANGE_ACTIVE_MENU";
export const SET_ACCOUNT_MENU_VISIBILITY = "SET_ACCOUNT_MENU_VISIBILITY";
export const SET_FILTER_MENU_VISIBILITY = "SET_FILTER_MENU_VISIBILITY";

export interface MenuState {
  accountMenuVisibility: boolean;
  filterMenuVisibility: boolean;
  activeMenu: string;
}

export interface SetAccountMenuVisibility {
  type: typeof SET_ACCOUNT_MENU_VISIBILITY;
  payload: {
    visibility: boolean;
  };
}

export interface SetFilterMenuVisibility {
  type: typeof SET_FILTER_MENU_VISIBILITY;
  payload: {
    visibility: boolean;
  };
}

export interface ChangeActiveMenu {
  type: typeof CHANGE_ACTIVE_MENU;
  payload: {
    key: string;
  };
}

export type MenuActionTypes = SetAccountMenuVisibility | SetFilterMenuVisibility | ChangeActiveMenu;
