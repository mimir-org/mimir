import { SaveState } from "../../../redux/store/localStorage/localStorage";

const SaveViewState = (key: string): void => {
  key === "treeview"
    ? SaveState(false, "blockview")
    : SaveState(false, "treeview");

  SaveState(true, key);
};

export default SaveViewState;
