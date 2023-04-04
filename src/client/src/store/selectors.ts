import { combineAppSelectors, createAppSelector } from "store";

// Project state selectors
export const projectStateSelector = createAppSelector(
  (state) => state.projectState,
  (projectState) => projectState
);
