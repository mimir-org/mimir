export const CHANGE_ACTIVE_MENU = "CHANGE_ACTIVE_MENU";
export const SET_PROJECT_MENU_VISIBILITY = "SET_PROJECT_MENU_VISIBILITY";
export const SET_USER_MENU_VISIBILITY = "SET_USER_MENU_VISIBILITY";
export const SET_TREE_FILTER_MENU_VISIBILITY = "SET_TREE_FILTER_MENU_VISIBILITY";
export const SET_BLOCK_FILTER_MENU_VISIBILITY = "SET_BLOCK_FILTER_MENU_VISIBILITY";

export interface MenuState {
  projectMenuVisibility: boolean;
  userMenuVisibility: boolean;
  treeFilterMenuVisibility: boolean;
  blockFilterMenuVisibility: boolean;
  activeMenu: string;
}

export interface SetProjectMenuVisibility {
  type: typeof SET_PROJECT_MENU_VISIBILITY;
  payload: {
    visibility: boolean;
  };
}

export interface SetUserMenuVisibility {
  type: typeof SET_USER_MENU_VISIBILITY;
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
  | SetProjectMenuVisibility
  | SetUserMenuVisibility
  | SetTreeFilterMenuVisibility
  | SetBlockFilterMenuVisibility
  | ChangeActiveMenu;
