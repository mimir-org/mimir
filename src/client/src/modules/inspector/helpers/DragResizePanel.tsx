import { Size } from "../../../compLibrary";
import { changeInspectorHeight } from "../redux/height/actions";

/**
 * Function to resize the height of the Inspector by click and drag.
 */
const DragResizePanel = (dispatch: any) => {
  const BORDER_SIZE = 44;
  const inspector = document.getElementById("InspectorModule");
  const adminTab = document.getElementById("admininfo");
  const terminalsTab = document.getElementById("terminals");
  let prevY: number;

  const resize = (e) => {
    const dy = prevY - e.clientY;
    prevY = e.clientY;

    // Change module height
    inspector.style.height = parseInt(getComputedStyle(inspector, "").height) + dy + "px";

    // Change tabs height
    if (adminTab) adminTab.style.height = parseInt(getComputedStyle(inspector, "").height) - 45 + "px";
    if (terminalsTab) terminalsTab.style.height = parseInt(getComputedStyle(inspector, "").height) - 80 + "px";
  };

  if (inspector) {
    inspector.addEventListener("mousedown", (e) => {
      if (e.offsetY < BORDER_SIZE) {
        prevY = e.clientY;
        document.addEventListener("mousemove", resize);
      }
    });

    document.addEventListener("mouseup", () => {
      const height = parseInt(getComputedStyle(inspector, "").height);
      if (height !== Size.ModuleClosed && height !== Size.ModuleOpen) dispatch(changeInspectorHeight(height));

      document.removeEventListener("mousemove", resize);
      inspector.removeEventListener("mousedown", resize);
    });
  }
};

export default DragResizePanel;
