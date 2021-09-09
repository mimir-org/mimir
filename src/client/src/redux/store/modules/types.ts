export const SET_MODULE_VISIBILITY = "SET_MODULE_VISIBILITY";
export const SET_ALL_MODULES_VISIBILITY = "SET_ALL_MODULES_VISIBILITY";

export interface SetModuleVisibilty {
  type: typeof SET_MODULE_VISIBILITY;
  payload: {
    key: string;
    visible: boolean;
    animate: boolean;
  };
}

export interface SetAllModulesVisibilty {
  type: typeof SET_ALL_MODULES_VISIBILITY;
  payload: {
    visible: boolean;
    animate: boolean;
  };
}

export type ModuleVisibilityActionTypes =
  | SetModuleVisibilty
  | SetAllModulesVisibilty;
