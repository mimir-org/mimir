import { Dispatch } from "redux";
import { changeTypeEditorVisibility } from "../redux/typeEditorSlice";

export const OnOpenTypeEditor = (onChange: () => void, dispatch: Dispatch) => {
  dispatch(changeTypeEditorVisibility(true));
  onChange();
};
