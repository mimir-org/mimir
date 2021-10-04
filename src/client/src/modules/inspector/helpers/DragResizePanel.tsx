/**
 * Function to resize the height of the Inspector by click and drag.
 */
const DragResizePanel = () => {
  const BORDER_SIZE = 44;
  const panel = document.getElementById("InspectorModule");
  const adminTab = document.getElementById("admininfo");
  const terminalsTab = document.getElementById("terminals");
  let prevY: number;

  if (panel) {
    panel.addEventListener("mousedown", (e) => {
      if (e.offsetY < BORDER_SIZE) {
        prevY = e.clientY;
        document.addEventListener("mousemove", resize);
      }
    });

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", resize);
      panel.removeEventListener("mousedown", resize);
    });
  }

  const resize = (e) => {
    const dy = prevY - e.clientY;
    prevY = e.clientY;

    // Change module height
    panel.style.height = parseInt(getComputedStyle(panel, "").height) + dy + "px";

    // Change tabs height
    if (adminTab) adminTab.style.height = parseInt(getComputedStyle(panel, "").height) - 45 + "px";
    if (terminalsTab) terminalsTab.style.height = parseInt(getComputedStyle(panel, "").height) - 80 + "px";
  };
};
export default DragResizePanel;
