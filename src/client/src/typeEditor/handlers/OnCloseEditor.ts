import { changeTypeEditorValidationVisibility, closeTypeEditor } from "../redux/actions";
const onCloseEditor = (dispatch: any) => {
  dispatch(changeTypeEditorValidationVisibility(false));
  dispatch(closeTypeEditor());
};

export default onCloseEditor;
