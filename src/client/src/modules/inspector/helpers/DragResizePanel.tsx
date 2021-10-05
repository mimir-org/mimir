import { Size } from "../../../compLibrary";
import { changeInspectorHeight } from "../redux/height/actions";

/**
 * Function to resize the height of the Inspector by click and drag.
 */
const DragResizePanel = (dispatch: any) => {
  const BORDER_SIZE = 44;
  const panel = document.getElementById("InspectorModule");

  let prevY: number;

  // Function to calculate new height
  const resize = (e) => {
    const dy = prevY - e.clientY;
    prevY = e.clientY;

    // Change module height
    panel.style.height = parseInt(getComputedStyle(panel, "").height) + dy + "px";
  };

  const drag = (e) => {
    e.preventDefault();
    if (e.offsetY < BORDER_SIZE) {
      prevY = e.clientY;
      panel.addEventListener("mousemove", resize);
    }
  };

  if (panel) {
    panel.addEventListener("mousedown", drag);

    panel.addEventListener("mouseup", () => {
      if (
        parseInt(getComputedStyle(panel, "").height) !== Size.ModuleOpen &&
        parseInt(getComputedStyle(panel, "").height) !== Size.ModuleClosed
      )
        dispatch(changeInspectorHeight(parseInt(getComputedStyle(panel, "").height)));

      panel.removeEventListener("mousemove", resize);
      panel.removeEventListener("mousedown", drag);
    });
  }
};
export default DragResizePanel;
