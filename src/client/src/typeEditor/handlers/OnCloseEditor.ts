import { changeTypeEditorValidationVisibility, changeTypeEditorVisibility } from "../redux/typeEditorSlice";

const onCloseEditor = (dispatch: any) => {
  dispatch(changeTypeEditorValidationVisibility(false));
  dispatch(changeTypeEditorVisibility(false));
};

export default onCloseEditor;
