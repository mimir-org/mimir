import {
  LoadState,
  SaveState,
} from "../../../redux/store/localStorage/localStorage";

const SaveViewState = (key: string) => {
  if (key === "treeview") {
    SaveState(true, key);
    SaveState(false, "blockview");
  }

  if (key === "blockview") {
    SaveState(true, key);
    SaveState(false, "treeview");
  }

  if (key === "switch") {
    if (LoadState("treeview") === true) {
      SaveState(false, "treeview");
      SaveState(true, "blockview");
      key = "blockview";
    } else {
      SaveState(false, "blockview");
      SaveState(true, "treeview");
      key = "treeview";
    }
  }
  return key;
};

export default SaveViewState;
