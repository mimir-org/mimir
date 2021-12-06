import red from "../redux/store";
import { VIEW_TYPE } from "../models/project";

const IsStartPage = () => {
  const view = red.store.getState().flow.view;
  return view === VIEW_TYPE.STARTPAGE;
};

export default IsStartPage;
