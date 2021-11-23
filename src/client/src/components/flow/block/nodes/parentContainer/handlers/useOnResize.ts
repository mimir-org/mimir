import { useEffect, useState } from "react";
import { GetFlowNodeByDataId } from "../../../helpers";
import { Direction } from "../helpers/constants";

const useOnResize = (id: string) => {
  const [direction, setDirection] = useState("");
  const [mouseDown, setMouseDown] = useState(false);

  const MIN_HEIGHT = 800;
  const box = document.getElementById("block-" + id);
  const flowBox = GetFlowNodeByDataId(id);
  let prevY: number;

  const handleMouseDown = (dir) => () => {
    setDirection(dir);
    setMouseDown(true);
  };

  handleMouseDown(Direction.Bottom);

  const onResize = (e) => {
    const dy = prevY - e.clientY;
    prevY = e.clientY;

    const nodeHeight = parseInt(getComputedStyle(box, "").height);
    if (nodeHeight - dy > MIN_HEIGHT) {
      box.style.height = nodeHeight - dy + "px";
      flowBox.style.height = nodeHeight - dy + "px";
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!direction) return;
      onResize(e);
    };

    if (mouseDown) window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseDown, direction, onResize]);

  useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // const MIN_HEIGHT = 200;
  // const box = document.getElementById("function-block-" + id);
  // const flowBox = GetNodeByDataId(id);
  // const panel = document.getElementById("ResizeParent");
  // let prevY: number;

  // const resize = (e) => {
  //   const dy = prevY - e.clientY;
  //   prevY = e.clientY;

  //   const height = parseInt(getComputedStyle(box, "").height);
  //   if (height - dy > MIN_HEIGHT) {
  //     box.style.height = height - dy + "px";
  //     flowBox.style.height = height - dy + "px";
  //   }
  // };

  // if (box && panel) {
  //   panel.addEventListener("mousedown", (e) => {
  //     prevY = e.clientY;
  //     document.addEventListener("mousemove", resize);
  //   });

  //   document.addEventListener("mouseup", () => {
  //     document.removeEventListener("mousemove", resize);
  //     panel.removeEventListener("mousedown", resize);
  //   });
  // }
};

export default useOnResize;
