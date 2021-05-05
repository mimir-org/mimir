import { VIEW_TYPE } from "../../../models/project";
import { SaveState } from "../../../redux/store/localStorage/localStorage";

const SaveViewState = (key: string): void => {
  key === VIEW_TYPE.TREEVIEW
    ? SaveState(false, VIEW_TYPE.BLOCKVIEW)
    : SaveState(false, VIEW_TYPE.TREEVIEW);

  SaveState(true, key);
};

export default SaveViewState;
