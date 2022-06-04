/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from "react";
import { Dispatch } from "redux";
import { Size } from "../../../../../../../assets/size/Size";
import { Node } from "../../../../../../../models";
import { updateBlockSize } from "../../../../../../../redux/store/project/actions";
import { GetFlowNodeByDataId } from "../helpers/GetFlowNodeByDataId";

const MIN_HEIGHT = Size.BLOCK_NODE_MIN_HEIGHT;
const MIN_WIDTH = Size.BLOCK_NODE_MIN_WIDTH;
const MAX_HEIGHT = Size.BLOCK_NODE_MAX_HEIGHT;
const MAX_WIDTH = Size.BLOCK_NODE_MAX_WIDTH;

/**
 * Hook to resize a parentNode in BlockView. The resizing is excuted by a mouse drag on the resize icon on the ParentNode.
 * When the resizing is done a dispatch runs and updates the size on the actual parentNode. This size will only affect
 * the node in BlockView.
 * @param node
 * @param resizePanelRef
 * @param dispatch
 */
export const useResizeParentNode = (node: Node, resizePanelRef: React.MutableRefObject<HTMLDivElement>, dispatch: Dispatch) => {
  const parentRef = useRef(null);
  const parentFlowRef = useRef(null);
  const nodeHeightRef = useRef(node.height);
  const nodeWidthRef = useRef(node.width);

  const prevYRef = useRef(nodeHeightRef.current);
  const prevXRef = useRef(nodeWidthRef.current);

  // Find the elements for the ParentNode
  useEffect(() => {
    // parentFlowRef points to the Flow node
    parentFlowRef.current = GetFlowNodeByDataId(node.id);
    // parentRef points to the Mimir node layered over the parentFlowRef
    parentRef.current = document.getElementById("parent-block-" + node.id);
  }, []);

  const onResizeCallback = useCallback(
    (e: MouseEvent) => onResize(e, prevXRef, prevYRef, nodeWidthRef, nodeHeightRef, parentRef, parentFlowRef),
    [prevXRef, prevYRef, nodeWidthRef, nodeHeightRef, parentRef, parentFlowRef]
  );

  const onMouseUpCallback = useCallback(
    () => onMouseUp(onResizeCallback, node.id, nodeWidthRef, nodeHeightRef, dispatch),
    [nodeHeightRef, nodeWidthRef, dispatch, onResizeCallback]
  );

  const onMouseDownCallback = useCallback(
    (e: MouseEvent) => onMouseDown(e, prevXRef, prevYRef, onResizeCallback, onMouseUpCallback),
    [prevXRef, prevYRef, onResizeCallback, onMouseUpCallback]
  );

  useEffect(() => {
    if (resizePanelRef.current) resizePanelRef.current.addEventListener("mousedown", onMouseDownCallback);
    return () => document.removeEventListener("mousemove", onResizeCallback);
  }, [parentRef, resizePanelRef, dispatch, onResizeCallback, onMouseDownCallback, onMouseUpCallback]);
};

export default useResizeParentNode;

const onResize = (
  e: MouseEvent,
  prevX: React.MutableRefObject<number>,
  prevY: React.MutableRefObject<number>,
  nodeWidthRef: React.MutableRefObject<number>,
  nodeHeightRef: React.MutableRefObject<number>,
  parentRef: React.MutableRefObject<HTMLElement>,
  parentFlowRef: React.MutableRefObject<HTMLElement>
) => {
  // Calculate new size
  const dx = prevX.current - e.clientX;
  const dy = prevY.current - e.clientY;

  prevX.current = e.clientX;
  prevY.current = e.clientY;

  nodeWidthRef.current = parseInt(getComputedStyle(parentFlowRef.current).width) - dx;
  nodeHeightRef.current = parseInt(getComputedStyle(parentFlowRef.current).height) - dy;

  // Implement new size
  if (nodeWidthRef.current > MIN_WIDTH && nodeWidthRef.current < MAX_WIDTH) {
    parentFlowRef.current.style.width = nodeWidthRef.current + "px";
    parentRef.current.style.width = nodeWidthRef.current + "px";
  }

  if (nodeHeightRef.current > MIN_HEIGHT && nodeHeightRef.current < MAX_HEIGHT) {
    parentFlowRef.current.style.height = nodeHeightRef.current + "px";
    parentRef.current.style.height = nodeHeightRef.current + "px";
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

const onMouseUp = (
  resizeCallback: (e: MouseEvent) => void,
  id: string,
  nodeWidthRef: React.MutableRefObject<number>,
  nodeHeightRef: React.MutableRefObject<number>,
  dispatch: Dispatch
) => {
  dispatch(updateBlockSize(id, { width: nodeWidthRef.current, height: nodeHeightRef.current }));
  document.removeEventListener("mousemove", resizeCallback);
};
