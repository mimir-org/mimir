import { Dispatch } from "redux";
import { OnCloseEditor } from ".";
import { CreateLibraryType } from "../../models";
import { changeTypeEditorValidationVisibility, saveLibraryType } from "../redux/typeEditorSlice";
import { IsTypeEditorSubmissionValid } from "../validators";

const OnSave = (dispatch: Dispatch, createLibraryType: CreateLibraryType) => {
  if (IsTypeEditorSubmissionValid(createLibraryType)) {
    dispatch(changeTypeEditorValidationVisibility(false));
    dispatch(saveLibraryType(createLibraryType));
    OnCloseEditor(dispatch);
  } else {
    dispatch(changeTypeEditorValidationVisibility(true));
  }
};

export default OnSave;
