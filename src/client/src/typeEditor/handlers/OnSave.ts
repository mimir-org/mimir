import { OnCloseEditor } from ".";
import { CreateLibraryType } from "../../models";
import { saveLibraryType } from "../redux/actions";

const OnSave = (dispatch: any, createLibraryType: CreateLibraryType) => {
  dispatch(saveLibraryType(createLibraryType));
  OnCloseEditor(dispatch);
};

export default OnSave;
