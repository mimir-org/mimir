const ResizePanel = () => {
  const BORDER_SIZE = 4;
  const panel = document.getElementById("InspectorModule");
  let prevY: number;

  const resize = (e) => {
    const dy = prevY - e.clientY;
    prevY = e.clientY;
    panel.style.height =
      parseInt(getComputedStyle(panel, "").height) + dy + "px";
  };

  if (panel !== null) {
    panel.addEventListener(
      "mousedown",
      (e) => {
        e.preventDefault();
        if (e.offsetY < BORDER_SIZE) {
          prevY = e.clientY;
          document.addEventListener("mousemove", resize, false);
        }
      },
      false
    );
    document.addEventListener(
      "mouseup",
      () => {
        document.removeEventListener("mousemove", resize, false);
      },
      false
    );
  }
};

export default ResizePanel;
