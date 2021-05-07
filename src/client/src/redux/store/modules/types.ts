export const CHANGE_MODULE_VISIBILITY = "CHANGE_MODULE_VISIBILITY";
export const CHANGE_ALL_MODULES_VISIBILITY = "CHANGE_ALL_MODULES_VISIBILITY";

export interface ChangeModuleVisibilty {
  type: typeof CHANGE_MODULE_VISIBILITY;
  payload: {
    key: string;
    visible: boolean;
    animate: boolean;
  };
}

export interface ChangeAllModulesVisibilty {
  type: typeof CHANGE_ALL_MODULES_VISIBILITY;
  payload: {
    visible: boolean;
    animate: boolean;
  };
}
