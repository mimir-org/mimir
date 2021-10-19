import { createAppSelector, combineAppSelectors } from "../../redux/store";

export const isProjectStateFetchingSelector = createAppSelector(
  (state) => state.projectState.fetching,
  (fetching) => fetching
);

export const isLibraryStateFetchingSelector = createAppSelector(
  (state) => state.library.fetching,
  (fetching) => fetching
);

export const isUserStateFetchingSelector = createAppSelector(
  (state) => state.userState.fetching,
  (fetching) => fetching
);

export const isCommonStateFetchingSelector = createAppSelector(
  (state) => state.commonState.fetching,
  (fetching) => fetching
);

export const isTypeEditorFetchingSelector = createAppSelector(
  (state) => state.typeEditor.fetching,
  (fetching) => fetching
);

export const isFetchingSelector = combineAppSelectors(
  [
    isProjectStateFetchingSelector,
    isLibraryStateFetchingSelector,
    isUserStateFetchingSelector,
    isCommonStateFetchingSelector,
    isTypeEditorFetchingSelector,
  ],
  (isProjectStateFetching, isLibraryStateFetching, isUserStateFetching, isCommonStateFetching, isTypeEditorFetching) =>
    isProjectStateFetching ||
    isLibraryStateFetching ||
    isUserStateFetching ||
    isCommonStateFetching ||
    isTypeEditorFetching
);
