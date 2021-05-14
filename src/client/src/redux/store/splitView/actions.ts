import { CHANGE_SPLITVIEW } from "./types";

export function changeSplitView(visible: boolean) {
  return {
    type: CHANGE_SPLITVIEW,
    payload: {
      visible,
    },
  };
}
