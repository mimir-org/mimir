import { combineAppSelectors, createAppSelector } from "store";

// Project state selectors
export const projectStateSelector = createAppSelector(
  (state) => state.projectState,
  (projectState) => projectState
);

export const projectStateFetchingSelector = createAppSelector(
  (state) => state.projectState.fetching?.length > 0,
  (fetching) => fetching
);

// Library state selectors
export const libraryStateSelector = createAppSelector(
  (state) => state.library,
  (libraryState) => libraryState
);

export const libraryStateFetchingSelector = createAppSelector(
  (state) => state.library.fetching?.length > 0,
  (fetching) => fetching
);

// Common state selectors
export const commonStateSelector = createAppSelector(
  (state) => state.commonState,
  (commonState) => commonState
);

export const commonStateFetchingSelector = createAppSelector(
  (state) => state.commonState.fetching?.length > 0,
  (fetching) => fetching
);

// Fetching selectors
export const fetchingSelector = combineAppSelectors(
  [projectStateFetchingSelector, commonStateFetchingSelector, libraryStateFetchingSelector],
  (isProjectStateFetching, isCommonStateFetching, isLibraryStateFetchingSelector) =>
    isProjectStateFetching || isCommonStateFetching || isLibraryStateFetchingSelector
);
