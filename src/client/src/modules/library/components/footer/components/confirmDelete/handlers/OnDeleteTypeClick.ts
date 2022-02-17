import { Dispatch } from "redux";
import { deleteLibraryItem } from "../../../../../../../redux/store/library/librarySlice";

export const OnDeleteTypeClick = (selectedElement: string, dispatch: Dispatch) => {
  dispatch(deleteLibraryItem(selectedElement));
};
