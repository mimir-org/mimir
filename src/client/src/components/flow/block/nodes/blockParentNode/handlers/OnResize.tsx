import { startResize, stopResize } from "../../../../../../redux/store/resize/actions";
import { GetNodeByDataId } from "../../../helpers";

const OnResize = (id: string, dispatch: any) => {
  const MIN_HEIGHT = 200;
  const box = document.getElementById("function-block-" + id);
  const flowBox = GetNodeByDataId(id);
  const panel = document.getElementById("ResizeParent");
  let prevY: number;

  const resize = (e) => {
    const dy = prevY - e.clientY;
    prevY = e.clientY;

    const height = parseInt(getComputedStyle(box, "").height);
    if (height - dy > MIN_HEIGHT) {
      box.style.height = height - dy + "px";
      flowBox.style.height = height - dy + "px";
      dispatch(startResize());
    }
  };

  if (box && panel) {
    panel.addEventListener("mousedown", (e) => {
      prevY = e.clientY;
      document.addEventListener("mousemove", resize);
    });

    document.addEventListener("mouseup", () => {
      dispatch(stopResize());

      document.removeEventListener("mousemove", resize);
      panel.removeEventListener("mousedown", resize);
    });
  }
};

export default OnResize;