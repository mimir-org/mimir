import { CHANGE_PROJECT_MENU } from "./types";

export function changeProjectMenu(key: string, visible: boolean) {
  return {
    type: CHANGE_PROJECT_MENU,
    payload: {
      key,
      visible,
    },
  };
}
