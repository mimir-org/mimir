import {
  loadStateFromStorage,
  saveStateToStorage,
} from "../../../redux/store/localStorage/localStorage";

const SaveViewState = (key: string) => {
  if (key === "treeview") {
    saveStateToStorage(true, key);
    saveStateToStorage(false, "blockview");
  }

  if (key === "blockview") {
    saveStateToStorage(true, key);
    saveStateToStorage(false, "treeview");
  }

  if (key === "switch") {
    if (loadStateFromStorage("treeview") === true) {
      saveStateToStorage(false, "treeview");
      saveStateToStorage(true, "blockview");
      key = "blockview";
    } else {
      saveStateToStorage(false, "blockview");
      saveStateToStorage(true, "treeview");
      key = "treeview";
    }
  }
  return key;
};

export default SaveViewState;
