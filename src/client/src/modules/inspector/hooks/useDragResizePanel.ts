import React, { useCallback, useEffect, useRef } from "react";
import { Action, Dispatch } from "redux";
import { Size } from "../../../compLibrary/size/Size";

const BORDER_SIZE = 44;
const MIN_HEIGHT = Size.MODULE_CLOSED;

export const useDragResizePanel = (
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  resizePanelRef: React.MutableRefObject<HTMLDivElement>,
  siblingRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch,
  changeInspectorHeightAction: (height: number) => Action,
  maxHeight?: number
) => {
  const prevYRef = useRef<number>();

  const resizeCallback = useCallback(
    (e: MouseEvent) => resize(e, prevYRef, inspectorRef, siblingRef, maxHeight),
    [prevYRef, inspectorRef, siblingRef, maxHeight]
  );

  const onMouseUpCallback = useCallback(
    () => onMouseUp(inspectorRef, resizeCallback, dispatch, changeInspectorHeightAction),
    [inspectorRef, resizeCallback, dispatch, changeInspectorHeightAction]
  );

  const onMouseDownCallback = useCallback(
    (e: MouseEvent) => onMouseDown(e, prevYRef, resizeCallback, onMouseUpCallback),
    [prevYRef, resizeCallback, onMouseUpCallback]
  );

  useEffect(() => {
    if (resizePanelRef.current) resizePanelRef.current.addEventListener("mousedown", onMouseDownCallback);

    return () => {
      document.removeEventListener("mousemove", resizeCallback);
    };
  }, [inspectorRef, resizePanelRef, maxHeight, dispatch, resizeCallback, onMouseDownCallback, onMouseUpCallback]);
};

const resize = (
  e: MouseEvent,
  prevYRef: React.MutableRefObject<number>,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  siblingRef: React.MutableRefObject<HTMLDivElement>,
  maxHeight?: number
) => {
  const dy = prevYRef.current - e.clientY;
  prevYRef.current = e.clientY;

  const prevHeight = getComputedHeight(inspectorRef);
  let newHeight = prevHeight + dy;

  if (maxHeight && newHeight > maxHeight) newHeight = maxHeight;
  else if (newHeight < MIN_HEIGHT) newHeight = MIN_HEIGHT;

  setHeightProperty(inspectorRef, newHeight);

  if (siblingRef) {
    const prevSiblingHeight = getComputedHeight(siblingRef);
    const newSiblingHeight = prevSiblingHeight - (newHeight - prevHeight);
    setHeightProperty(siblingRef, newSiblingHeight);
  }
};

const onMouseDown = (
  e: MouseEvent,
  prevYRef: React.MutableRefObject<number>,
  resizeCallback: (e: MouseEvent) => void,
  onMouseUpCallback: () => void
) => {
  if (e.offsetY < BORDER_SIZE) {
    prevYRef.current = e.clientY;
    document.addEventListener("mousemove", resizeCallback);
    document.addEventListener("mouseup", onMouseUpCallback, { once: true });
  }
};

const onMouseUp = (
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  resizeCallback: (e: MouseEvent) => void,
  dispatch: Dispatch,
  changeInspectorHeightAction: (height: number) => Action
) => {
  if (inspectorRef.current) {
    const height = getComputedHeight(inspectorRef);
    if (height !== Size.MODULE_CLOSED && height !== Size.MODULE_OPEN) dispatch(changeInspectorHeightAction(height));
  }

  document.removeEventListener("mousemove", resizeCallback);
};

const getComputedHeight = (ref: React.MutableRefObject<HTMLDivElement>) => parseInt(getComputedStyle(ref.current).height);

const setHeightProperty = (ref: React.MutableRefObject<HTMLDivElement>, height: number) => {
  ref.current.style.height = height + "px";
};
