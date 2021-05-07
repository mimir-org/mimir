import { CHANGE_MODULE_VISIBILITY } from "./types";

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
