import { Dispatch } from "redux";
import { changeTypeEditorValidationVisibility, changeTypeEditorVisibility } from "../redux/typeEditorSlice";

const onCloseEditor = (dispatch: Dispatch) => {
  dispatch(changeTypeEditorValidationVisibility(false));
  dispatch(changeTypeEditorVisibility(false));
};

export default onCloseEditor;
