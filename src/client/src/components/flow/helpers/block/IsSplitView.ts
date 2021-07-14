import red from "../../../../redux/store";

const IsSplitView = (): boolean => {
  return red.store.getState().splitView.visible;
};

export default IsSplitView;
