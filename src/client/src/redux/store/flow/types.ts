export const CHANGE_FLOW_VIEW = "CHANGE_FLOW_VIEW";

export interface ChangeFlowView {
  type: typeof CHANGE_FLOW_VIEW;
  payload: {
    key: string;
    visible: boolean;
  };
}
