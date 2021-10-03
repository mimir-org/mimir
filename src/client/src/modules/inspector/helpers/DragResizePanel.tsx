import { Size } from "../../../compLibrary";
import { changeInspectorHeight } from "../redux/height/actions";

/**
 * Function to change height of Inspector by click and drag.
 */
const DragResizePanel = (dispatch: any) => {
  const BORDER_SIZE = 44;
  const module = "InspectorModule";
  const panel = document.getElementById(module);
  const admin = document.getElementById("admininfo");
  const terminal = document.getElementById("terminals");
  let prevY: number;

  if (panel) {
    panel.addEventListener("mousedown", (e) => {
      if (e.offsetY < BORDER_SIZE) {
        prevY = e.clientY;
        document.addEventListener("mousemove", resize);
      }
    });
    document.addEventListener("mouseup", () => {
      if (
        parseInt(getComputedStyle(panel, "").height) !== Size.ModuleClosed &&
        parseInt(getComputedStyle(panel, "").height) !== Size.ModuleOpen
      ) {
        dispatch(changeInspectorHeight(parseInt(getComputedStyle(panel, "").height)));
      }

      document.removeEventListener("mousemove", resize);
      panel.removeEventListener("mousedown", resize);
    });
  }

  const resize = (e) => {
    const dy = prevY - e.clientY;
    prevY = e.clientY;

    // Change module height
    if (prevY < 1100) {
      panel.style.height = parseInt(getComputedStyle(panel, "").height) + dy + "px";
      // Change tabs height
      if (admin) admin.style.height = parseInt(getComputedStyle(panel, "").height) - 45 + "px";
      if (terminal) terminal.style.height = parseInt(getComputedStyle(panel, "").height) - 80 + "px";
    }
  };
};

export default DragResizePanel;
