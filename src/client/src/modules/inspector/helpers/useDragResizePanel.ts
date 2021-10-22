import React, { useCallback, useEffect, useRef } from "react";
import { Dispatch } from "redux";
import { Size } from "../../../compLibrary";
import { changeInspectorHeight } from "../redux/height/actions";

const BORDER_SIZE = 44;

export const useDragResizePanel = (
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  resizePanelRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch,
  maxHeight?: number
) => {
  let prevYRef = useRef<number>();

  const resizeCallback = useCallback(
    (e: MouseEvent) => resize(e, prevYRef, inspectorRef, maxHeight),
    [prevYRef, inspectorRef, maxHeight]
  );

  const onMouseDownCallback = useCallback(
    (e: MouseEvent) => onMouseDown(e, prevYRef, resizeCallback),
    [prevYRef, resizeCallback]
  );

  const onMouseUpCallback = useCallback(
    () => onMouseUp(inspectorRef, resizeCallback, dispatch),
    [inspectorRef, resizeCallback, dispatch]
  );

  useEffect(() => {
    if (resizePanelRef.current) {
      resizePanelRef.current.addEventListener("mousedown", onMouseDownCallback);
      document.addEventListener("mouseup", onMouseUpCallback);
    }

    return () => {
      document.removeEventListener("mouseup", onMouseUpCallback);
    };
  }, [inspectorRef, resizePanelRef, maxHeight, dispatch, resizeCallback, onMouseDownCallback, onMouseUpCallback]);
};

const resize = (
  e: MouseEvent,
  prevYRef: React.MutableRefObject<number>,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  maxHeight?: number
) => {
  const dy = prevYRef.current - e.clientY;
  prevYRef.current = e.clientY;

  let newHeight = parseInt(getComputedStyle(inspectorRef.current).height) + dy;

  if (maxHeight && newHeight > maxHeight) {
    newHeight = maxHeight;
  }
  inspectorRef.current.style.height = newHeight + "px";
};

const onMouseDown = (
  e: MouseEvent,
  prevYRef: React.MutableRefObject<number>,
  resizeCallBack: (e: MouseEvent) => void
) => {
  if (e.offsetY < BORDER_SIZE) {
    prevYRef.current = e.clientY;
    document.addEventListener("mousemove", resizeCallBack);
  }
};

const onMouseUp = (
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  resizeCallBack: (e: MouseEvent) => void,
  dispatch: Dispatch
) => {
  if (inspectorRef.current) {
    const height = parseInt(getComputedStyle(inspectorRef.current).height);
    if (height !== Size.ModuleClosed && height !== Size.ModuleOpen) dispatch(changeInspectorHeight(height));
  }

  document.removeEventListener("mousemove", resizeCallBack);
};
