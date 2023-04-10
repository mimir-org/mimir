import { combineAppSelectors, createAppSelector } from "store";

// Project state selectors
export const projectStateSelector = createAppSelector(
  (state) => state.projectState,
  (projectState) => projectState
);

// Project state selectors
export const commonStateSelector = createAppSelector(
  (state) => state.commonState,
  (commonState) => commonState
);
