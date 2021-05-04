import { SaveState } from "../../../redux/store/localStorage/localStorage";

const SaveViewState = (key: string): void => {
  if (key === "treeview") {
    SaveState(true, key);
    SaveState(false, "blockview");
  }

  if (key === "blockview") {
    SaveState(true, key);
    SaveState(false, "treeview");
  }
};

export default SaveViewState;
