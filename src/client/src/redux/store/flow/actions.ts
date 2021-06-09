import { CHANGE_FLOW_VIEW } from "./types";

export function changeFlowView(view: string) {
  return {
    type: CHANGE_FLOW_VIEW,
    payload: {
      view,
    },
  };
}
