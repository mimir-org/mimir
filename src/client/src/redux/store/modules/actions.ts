import { SET_MODULE_VISIBILITY, SET_MODULES_VISIBILITY } from "./types";

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

export function setModulesVisibility(visible: boolean, animate: boolean) {
  return {
    type: SET_MODULES_VISIBILITY,
    payload: {
      visible,
      animate,
    },
  };
}
