import { deleteLibraryItem } from "../../../redux/store/library/librarySlice";
import { Dispatch } from "redux";

export const OnDeleteTypeClick = (selectedElement: string, dispatch: Dispatch) => {
  dispatch(deleteLibraryItem(selectedElement));
};
