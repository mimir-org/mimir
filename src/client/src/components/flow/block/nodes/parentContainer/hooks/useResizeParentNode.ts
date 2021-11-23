/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from "react";
import { nodeSizeSelector, useAppSelector } from "../../../../../../redux/store";
import { GetFlowNodeByDataId } from "../../../helpers";
import { setBlockNodeHeight } from "../../../redux/actions";

const MIN_HEIGHT = 700;

const useResizeParentNode = (id: string, resizePanelRef: React.MutableRefObject<HTMLDivElement>, dispatch: any) => {
  const parentNodeRef = useRef(null);
  const parentNodeFlowRef = useRef(null);
  const parentNodeSize = useAppSelector(nodeSizeSelector);
  const nodeHeightRef = useRef(parentNodeSize.height);
  const prevYRef = useRef(nodeHeightRef.current);

  useEffect(() => {
    parentNodeRef.current = document.getElementById("block-" + id);
    parentNodeFlowRef.current = GetFlowNodeByDataId(id);
  }, []);

  const onResizeCallback = useCallback(
    (e: MouseEvent) => onResize(e, prevYRef, parentNodeRef, parentNodeFlowRef, nodeHeightRef),
    [prevYRef, parentNodeRef, parentNodeFlowRef, nodeHeightRef]
  );

  const onMouseUpCallback = useCallback(
    () => onMouseUp(nodeHeightRef, dispatch, onResizeCallback),
    [nodeHeightRef, dispatch, onResizeCallback]
  );

  const onMouseDownCallback = useCallback(
    (e: MouseEvent) => onMouseDown(e, prevYRef, onResizeCallback, onMouseUpCallback),
    [prevYRef, onResizeCallback, onMouseUpCallback]
  );

  useEffect(() => {
    if (resizePanelRef.current) resizePanelRef.current.addEventListener("mousedown", onMouseDownCallback);
    return () => document.removeEventListener("mousemove", onResizeCallback);
  }, [parentNodeRef, resizePanelRef, dispatch, onResizeCallback, onMouseDownCallback, onMouseUpCallback]);
};

export default useResizeParentNode;

const onResize = (
  e: MouseEvent,
  prevY: React.MutableRefObject<number>,
  parentRef: React.MutableRefObject<HTMLElement>,
  parentNodeFlowRef: React.MutableRefObject<HTMLElement>,
  nodeHeightRef: React.MutableRefObject<number>
) => {
  const dy = prevY.current - e.clientY;
  prevY.current = e.clientY;
  nodeHeightRef.current = parseInt(getComputedStyle(parentRef.current).height) - dy;

  if (nodeHeightRef.current > MIN_HEIGHT) {
    parentRef.current.style.height = nodeHeightRef.current + "px";
    parentNodeFlowRef.current.style.height = nodeHeightRef.current + "px";
  }
};

const onMouseDown = (
  e: MouseEvent,
  prevYRef: React.MutableRefObject<number>,
  resizeCallback: (e: MouseEvent) => void,
  onMouseUpCallback: () => void
) => {
  prevYRef.current = e.clientY;
  document.addEventListener("mousemove", resizeCallback);
  document.addEventListener("mouseup", onMouseUpCallback, { once: true });
};

const onMouseUp = (nodeHeightRef: React.MutableRefObject<number>, dispatch: any, resizeCallback: (e: MouseEvent) => void) => {
  if (nodeHeightRef.current > MIN_HEIGHT) dispatch(setBlockNodeHeight(nodeHeightRef.current));
  document.removeEventListener("mousemove", resizeCallback);
};
