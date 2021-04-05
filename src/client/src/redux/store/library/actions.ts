import {
  FETCHING_LIBRARY,
  LibraryActionTypes  
} from "./types";

export function searcLibrary(searchString: string): LibraryActionTypes {
  return {
    type: FETCHING_LIBRARY,
    payload: searchString
  };
}
