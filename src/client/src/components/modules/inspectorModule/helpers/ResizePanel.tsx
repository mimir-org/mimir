const ResizePanel = () => {
  const BORDER_SIZE = 4;
  const module = "InspectorModule";
  const panel = document.getElementById(module);
  let prevY: number;

  const resize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const dy = prevY - e.clientY;
    prevY = e.clientY;
    panel.style.height =
      parseInt(getComputedStyle(panel, "").height) + dy + "px";
  };

  if (panel !== null) {
    panel.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
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

export default ResizePanel;
