import { combineAppSelectors, createAppSelector } from "store";

// Project state selectors
export const projectStateSelector = createAppSelector(
  (state) => state.projectState,
  (projectState) => projectState
);

export const projectSelector = createAppSelector(
  (state) => state.projectState?.project,
  (project) => project
);

export const projectListSelector = createAppSelector(
  (state) => state.projectState?.projectList,
  (projects) => projects
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

export const libraryTerminalTypesSelector = createAppSelector(
  (state) => state.library?.terminalTypes,
  (terminaltypes) => terminaltypes
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

export const viewTypeSelector = createAppSelector(
  (state) => state.commonState?.view,
  (view) => view
);

export const modulesSelector = createAppSelector(
  (state) => state.commonState?.modules,
  (modules) => modules
);

export const userSelector = createAppSelector(
  (state) => state.commonState?.user,
  (user) => user
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
