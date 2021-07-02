import { CHANGE_MENU } from "./types";

export function changeMenu(key: string, visible: boolean) {
  return {
    type: CHANGE_MENU,
    payload: {
      key,
      visible,
    },
  };
}
