export const SET_MODULE_VISIBILITY = "SET_MODULE_VISIBILITY";
export const SET_MODULES_VISIBILITY = "SET_MODULES_VISIBILITY";

export interface SetModuleVisibilty {
  type: typeof SET_MODULE_VISIBILITY;
  payload: {
    key: string;
    visible: boolean;
    animate: boolean;
  };
}

export interface SetModulesVisibilty {
  type: typeof SET_MODULES_VISIBILITY;
  payload: {
    visible: boolean;
    animate: boolean;
  };
}

export type ModuleVisibilityActionTypes =
  | SetModuleVisibilty
  | SetModulesVisibilty;
