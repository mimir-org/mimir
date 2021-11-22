import { useCallback, useRef, useState } from "react";
import { GetNodeByDataId } from "../../../helpers";
import { setBlockNodeHeight } from "../../../redux/actions";

const OnResize = (id: string, dispatch: any, e) => {
  const [size, setSize] = useState({ x: 400, y: 300 });
  const ref = useRef();

  const handler = useCallback(() => {
    function onMouseMove(e) {
      setSize((currentSize) => ({
        x: currentSize.x + e.movementX,
        y: currentSize.y + e.movementY,
      }));
    }

    // function onMouseUp() {
    //   ref.current.removeEventListener("mousemove", onMouseMove);
    //   ref.current.removeEventListener("mouseup", onMouseUp);
    // }

    // ref.current.addEventListener("mousemove", onMouseMove);
    // ref.current.addEventListener("mouseup", onMouseUp);
  }, []);
};

export default OnResize;

// import { GetNodeByDataId } from "../../../helpers";
// import { setBlockNodeHeight } from "../../../redux/actions";

// const OnResize = (id: string, dispatch: any, e) => {
//   console.log("Herjher");
//   const MIN_HEIGHT = 900;
//   const parentNode = document.getElementById("block-" + id);
//   const flowBox = GetNodeByDataId(id);
//   const resizePanel = document.getElementById("ResizeParentNode");
//   let prevY: number;
//   let height = 0;

//   const onResize = (e) => {
//     const dy = prevY - e.clientY;
//     prevY = e.clientY;

//     height = parseInt(getComputedStyle(parentNode, "").height);
//     if (height - dy > MIN_HEIGHT) {
//       parentNode.style.height = height - dy + "px";
//       flowBox.style.height = height - dy + "px";
//     }
//   };

//   const onMoveUp = () => {
//     console.log("up");

//     if (height >= MIN_HEIGHT) dispatch(setBlockNodeHeight(height));
//     document.removeEventListener("mousemove", onResize);
//     resizePanel.removeEventListener("mousedown", onResize);
//   };

//   if (parentNode && resizePanel) {
//     resizePanel.addEventListener("mousedown", (e) => {
//       prevY = e.clientY;
//       document.addEventListener("mousemove", onResize);
//     });

//     document.addEventListener("mouseup", onMoveUp);
//     document.removeEventListener("mouseup", onMoveUp);
//   }
// };

// export default OnResize;
