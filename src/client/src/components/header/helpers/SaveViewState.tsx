import {
  loadStateFromStorage,
  saveStateToStorage,
} from "../../../redux/store/localStorage/localStorage";

const SaveViewState = (key: string) => {
  if (key === "treeview") {
    saveStateToStorage(true, key);
    saveStateToStorage(false, "diagram");
  }

  if (key === "diagram") {
    saveStateToStorage(true, key);
    saveStateToStorage(false, "treeview");
  }

  if (key === "switch") {
    if (loadStateFromStorage("treeview") === true) {
      saveStateToStorage(false, "treeview");
      saveStateToStorage(true, "diagram");
      key = "diagram";
    } else {
      saveStateToStorage(false, "diagram");
      saveStateToStorage(true, "treeview");
      key = "treeview";
    }
  }
  return key;
};

export default SaveViewState;
