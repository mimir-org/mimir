import React, { useCallback, useEffect, useRef } from "react";
import { Action, Dispatch } from "redux";
import { Size } from "../../../compLibrary";

const BORDER_SIZE = 44;
const MIN_HEIGHT = Size.ModuleClosed;

export const useDragResizePanel = (
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  resizePanelRef: React.MutableRefObject<HTMLDivElement>,
  siblingRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch,
  changeInspectorHeightAction: (height: number) => Action,
  maxHeight?: number
) => {
  let prevYRef = useRef<number>();

  const resizeCallback = useCallback(
    (e: MouseEvent) => resize(e, prevYRef, inspectorRef, siblingRef, maxHeight),
    [prevYRef, inspectorRef, siblingRef, maxHeight]
  );

  const onMouseDownCallback = useCallback(
    (e: MouseEvent) => onMouseDown(e, prevYRef, resizeCallback),
    [prevYRef, resizeCallback]
  );

  const onMouseUpCallback = useCallback(
    () => onMouseUp(inspectorRef, resizeCallback, dispatch, changeInspectorHeightAction),
    [inspectorRef, resizeCallback, dispatch, changeInspectorHeightAction]
  );

  useEffect(() => {
    if (resizePanelRef.current) {
      resizePanelRef.current.addEventListener("mousedown", onMouseDownCallback);
      document.addEventListener("mouseup", onMouseUpCallback);
    }

    return () => {
      document.removeEventListener("mousemove", resizeCallback);
      document.removeEventListener("mouseup", onMouseUpCallback);
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

  let prevHeight = parseInt(getComputedStyle(inspectorRef.current).height);

  let newHeight = prevHeight + dy;

  if (maxHeight && newHeight > maxHeight) {
    newHeight = maxHeight;
  } else if (newHeight < MIN_HEIGHT) {
    newHeight = MIN_HEIGHT;
  }
  inspectorRef.current.style.height = newHeight + "px";

  if (siblingRef) {
    let prevSiblingHeight = parseInt(getComputedStyle(siblingRef.current).height);

    let newSiblingHeight = prevSiblingHeight - (newHeight - prevHeight);

    siblingRef.current.style.height = newSiblingHeight + "px";
  }
};

const onMouseDown = (
  e: MouseEvent,
  prevYRef: React.MutableRefObject<number>,
  resizeCallback: (e: MouseEvent) => void
) => {
  if (e.offsetY < BORDER_SIZE) {
    prevYRef.current = e.clientY;
    document.addEventListener("mousemove", resizeCallback);
  }
};

const onMouseUp = (
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  resizeCallback: (e: MouseEvent) => void,
  dispatch: Dispatch,
  changeInspectorHeightAction: (height: number) => Action
) => {
  if (inspectorRef.current) {
    const height = parseInt(getComputedStyle(inspectorRef.current).height);
    if (height !== Size.ModuleClosed && height !== Size.ModuleOpen) dispatch(changeInspectorHeightAction(height));
  }

  document.removeEventListener("mousemove", resizeCallback);
};
