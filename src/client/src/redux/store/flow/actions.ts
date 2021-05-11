import { CHANGE_FLOW_VIEW } from "./types";

export function changeFlowView(key: string, visible: boolean) {
  return {
    type: CHANGE_FLOW_VIEW,
    payload: {
      key,
      visible,
    },
  };
}
