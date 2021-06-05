import { VIEW_TYPE } from "../../../../models/project";
import red from "../../../../redux/store";

const IsBlockView = (): boolean => {
  const view = red.store.getState().flow.view;
  return view === VIEW_TYPE.BLOCKVIEW;
};

export default IsBlockView;
