import {
  CHANGE_MODULE_VISIBILITY,
  CHANGE_ALL_MODULES_VISIBILITY,
} from "./types";

export function changeModuleVisibility(
  key: string,
  visible: boolean,
  animate: boolean
) {
  return {
    type: CHANGE_MODULE_VISIBILITY,
    payload: {
      key,
      visible,
      animate,
    },
  };
}

export function changeAllModulesVisibility(visible: boolean, animate: boolean) {
  return {
    type: CHANGE_ALL_MODULES_VISIBILITY,
    payload: {
      visible,
      animate,
    },
  };
}
