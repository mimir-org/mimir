import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  loadStateFromStorage,
  saveStateToStorage,
} from "../../../redux/store/localStorage/localStorage";

const UseChangeViewHandler = (e) => {
  const { push } = useHistory();
  const key = e.target.alt;
  const [showDiagram, setShowDiagram] = useState(
    loadStateFromStorage("diagram")
  );

  if (key === "treeview") {
    saveStateToStorage(true, key);
    saveStateToStorage(false, "diagram");
    setShowDiagram(loadStateFromStorage("diagram"));
    push(`/home/${key}`);
  } else if (key === "diagram") {
    saveStateToStorage(true, key);
    saveStateToStorage(false, "treeview");
    setShowDiagram(loadStateFromStorage(key));
    push(`/home/${key}`);
  } else if (key === "switch") {
    if (loadStateFromStorage("treeview") === true) {
      saveStateToStorage(false, "treeview");
      saveStateToStorage(true, "diagram");
      push("/home/diagram");
    } else {
      saveStateToStorage(false, "diagram");
      saveStateToStorage(true, "treeview");
      push("/home/treeview");
    }
  }
};

export default UseChangeViewHandler;
