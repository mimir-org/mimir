import { deleteLibraryItem } from "../../../redux/store/library/librarySlice";
import { Dispatch } from "redux";

const OnDeleteTypeClick = (selectedElement: string, dispatch: Dispatch) => {
  dispatch(deleteLibraryItem(selectedElement));
};

export default OnDeleteTypeClick;
