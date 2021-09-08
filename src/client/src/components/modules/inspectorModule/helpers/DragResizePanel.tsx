const DragResizePanel = () => {
  const BORDER_SIZE = 12;
  const module = "InspectorModule";
  const panel = document.getElementById(module);
  const adminTab = document.getElementById("admininfo");
  const terminalsTab = document.getElementById("terminals");
  let prevY: number;

  const resize = (e) => {
    // e.preventDefault();
    // e.stopPropagation();
    const dy = prevY - e.clientY;
    prevY = e.clientY;

    // Change module height
    panel.style.height =
      parseInt(getComputedStyle(panel, "").height) + dy + "px";

    // Change tabs height
    if (adminTab) {
      adminTab.style.height =
        parseInt(getComputedStyle(panel, "").height) - 80 + "px";
    }

    if (terminalsTab) {
      terminalsTab.style.height =
        parseInt(getComputedStyle(panel, "").height) - 80 + "px";
    }
  };

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
};

export default DragResizePanel;
