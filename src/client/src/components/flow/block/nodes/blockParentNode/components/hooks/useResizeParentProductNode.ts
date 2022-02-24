/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from "react";
import { Dispatch } from "redux";
import { Node } from "../../../../../../../models";
import { GetFlowNodeByDataId } from "../../helpers/GetFlowNodeByDataId";

const MIN_HEIGHT = 700;
const MIN_WIDTH = 700;

/**
 * Hook to resize Product parentNode in BlockView.
 * @param node
 * @param resizePanelRef
 * @param dispatch
 */
export const useResizeParentProductNode = (
  node: Node,
  resizePanelRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch
) => {
  const parentProductNodeRef = useRef(null);
  const parentProductNodeFlowRef = useRef(null);
  const nodeHeightRef = useRef(window.innerHeight);
  const nodeWidthRef = useRef(window.innerWidth);

  const prevYRef = useRef(nodeHeightRef.current);
  const prevXRef = useRef(nodeWidthRef.current);

  useEffect(() => {
    parentProductNodeRef.current = document.getElementById("parent-block-" + node.id);
    parentProductNodeFlowRef.current = GetFlowNodeByDataId(node.id);
  }, []);

  const onResizeCallback = useCallback(
    (e: MouseEvent) =>
      onResize(e, prevXRef, prevYRef, nodeWidthRef, nodeHeightRef, parentProductNodeRef, parentProductNodeFlowRef),
    [prevXRef, prevYRef, nodeWidthRef, nodeHeightRef, parentProductNodeRef, parentProductNodeFlowRef]
  );

  const onMouseUpCallback = useCallback(
    () => onMouseUp(onResizeCallback),
    [nodeHeightRef, nodeWidthRef, dispatch, onResizeCallback]
  );

  const onMouseDownCallback = useCallback(
    (e: MouseEvent) => onMouseDown(e, prevXRef, prevYRef, onResizeCallback, onMouseUpCallback),
    [prevXRef, prevYRef, onResizeCallback, onMouseUpCallback]
  );

  useEffect(() => {
    if (resizePanelRef.current) resizePanelRef.current.addEventListener("mousedown", onMouseDownCallback);
    return () => document.removeEventListener("mousemove", onResizeCallback);
  }, [parentProductNodeRef, resizePanelRef, dispatch, onResizeCallback, onMouseDownCallback, onMouseUpCallback]);
};

const onResize = (
  e: MouseEvent,
  prevX: React.MutableRefObject<number>,
  prevY: React.MutableRefObject<number>,
  nodeWidthRef: React.MutableRefObject<number>,
  nodeHeightRef: React.MutableRefObject<number>,
  parentRef: React.MutableRefObject<HTMLElement>,
  parentNodeFlowRef: React.MutableRefObject<HTMLElement>
) => {
  const dy = prevY.current - e.clientY;
  const dx = prevX.current - e.clientX;
  prevY.current = e.clientY;
  prevX.current = e.clientX;

  nodeHeightRef.current = parseInt(getComputedStyle(parentRef.current).height) - dy;
  nodeWidthRef.current = parseInt(getComputedStyle(parentRef.current).width) - dx;

  if (nodeHeightRef.current > MIN_HEIGHT) {
    parentRef.current.style.height = nodeHeightRef.current + "px";
    parentNodeFlowRef.current.style.height = nodeHeightRef.current + "px";
  }
  if (nodeWidthRef.current > MIN_WIDTH) {
    parentRef.current.style.width = nodeWidthRef.current + "px";
    parentNodeFlowRef.current.style.width = nodeWidthRef.current + "px";
  }
};

const onMouseDown = (
  e: MouseEvent,
  prevXRef: React.MutableRefObject<number>,
  prevYRef: React.MutableRefObject<number>,
  resizeCallback: (e: MouseEvent) => void,
  onMouseUpCallback: () => void
) => {
  prevXRef.current = e.clientX;
  prevYRef.current = e.clientY;
  document.addEventListener("mousemove", resizeCallback);
  document.addEventListener("mouseup", onMouseUpCallback, { once: true });
};

const onMouseUp = (resizeCallback: (e: MouseEvent) => void) => {
  document.removeEventListener("mousemove", resizeCallback);
};
