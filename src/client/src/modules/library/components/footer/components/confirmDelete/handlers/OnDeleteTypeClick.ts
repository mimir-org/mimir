import { Dispatch } from "redux";
import { deleteLibraryItem } from "../../../../../../../redux/store/library/librarySlice";

export const onDeleteTypeClick = (selectedElement: string, dispatch: Dispatch, callback?: () => void) => {
  dispatch(deleteLibraryItem(selectedElement));
  callback && callback();
};
