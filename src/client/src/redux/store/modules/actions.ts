import { CHANGE_MODULE_VISIBILITY } from "./types";

export function changeModuleVisibility(key: string, visible: boolean) {
  return {
    type: CHANGE_MODULE_VISIBILITY,
    payload: {
      key,
      visible,
    },
  };
}
