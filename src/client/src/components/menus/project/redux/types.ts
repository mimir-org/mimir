export const CHANGE_ACTIVE_MENU = "CHANGE_ACTIVE_MENU";
export const SET_ACCOUNT_MENU_VISIBILITY = "SET_ACCOUNT_MENU_VISIBILITY";
export const SET_TREE_FILTER_MENU_VISIBILITY = "SET_TREE_FILTER_MENU_VISIBILITY";
export const SET_BLOCK_FILTER_MENU_VISIBILITY = "SET_BLOCK_FILTER_MENU_VISIBILITY";

export interface MenuState {
  accountMenuVisibility: boolean;
  treeFilterMenuVisibility: boolean;
  blockFilterMenuVisibility: boolean;
  activeMenu: string;
}

export interface SetAccountMenuVisibility {
  type: typeof SET_ACCOUNT_MENU_VISIBILITY;
  payload: {
    visibility: boolean;
  };
}

export interface SetTreeFilterMenuVisibility {
  type: typeof SET_TREE_FILTER_MENU_VISIBILITY;
  payload: {
    visibility: boolean;
  };
}

export interface SetBlockFilterMenuVisibility {
  type: typeof SET_BLOCK_FILTER_MENU_VISIBILITY;
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

export type MenuActionTypes =
  | SetAccountMenuVisibility
  | SetTreeFilterMenuVisibility
  | SetBlockFilterMenuVisibility
  | ChangeActiveMenu;
