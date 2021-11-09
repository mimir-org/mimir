import red from "../redux/store";
import { VIEW_TYPE } from "../models/project";

const IsBlockView = () => {
  const view = red.store.getState().flow.view;
  return view === VIEW_TYPE.BLOCKVIEW;
};

export default IsBlockView;
