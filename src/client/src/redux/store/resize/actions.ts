import { START_RESIZE, STOP_RESIZE } from "./types";

export function startResize() {
  return {
    type: START_RESIZE,
    payload: null,
  };
}

export function stopResize() {
  return {
    type: STOP_RESIZE,
    payload: null,
  };
}
