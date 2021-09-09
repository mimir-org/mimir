import { SET_MODULE_VISIBILITY, SET_ALL_MODULES_VISIBILITY } from "./types";

export function setModuleVisibility(
  key: string,
  visible: boolean,
  animate: boolean
) {
  return {
    type: SET_MODULE_VISIBILITY,
    payload: {
      key,
      visible,
      animate,
    },
  };
}

export function setAllModulesVisibility(visible: boolean, animate: boolean) {
  return {
    type: SET_ALL_MODULES_VISIBILITY,
    payload: {
      visible,
      animate,
    },
  };
}
