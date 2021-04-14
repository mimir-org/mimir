import { FETCHING_LIBRARY, LibraryActionTypes } from "./types";

export function searchLibrary(searchString: string): LibraryActionTypes {
  return {
    type: FETCHING_LIBRARY,
    payload: searchString,
  };
}
