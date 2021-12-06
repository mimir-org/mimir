import { OnCloseEditor } from ".";
import { CreateLibraryType } from "../../models";
import { changeTypeEditorValidationVisibility, saveLibraryType } from "../redux/actions";
import { IsTypeEditorSubmissionValid } from "../validators";

const OnSave = (dispatch: any, createLibraryType: CreateLibraryType) => {
  if (IsTypeEditorSubmissionValid(createLibraryType)) {
    dispatch(changeTypeEditorValidationVisibility(false));
    dispatch(saveLibraryType(createLibraryType));
    OnCloseEditor(dispatch);
  } else {
    dispatch(changeTypeEditorValidationVisibility(true));
  }
};

export default OnSave;
