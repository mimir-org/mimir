export const CHANGE_SPLITVIEW = "CHANGE_SPLITVIEW";

export interface ChangeSplitView {
  type: typeof CHANGE_SPLITVIEW;
  payload: {
    visible: boolean;
  };
}
