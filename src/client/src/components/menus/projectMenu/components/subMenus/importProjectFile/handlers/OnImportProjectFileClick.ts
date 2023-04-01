import { changeActiveMenu } from "../../redux/menuSlice";
// import { importProjectAction } from "../../../../../../../redux/store/project/actions";
import { Dispatch } from "redux";

export const OnImportProjectFileClick = (clear: () => void, dispatch: Dispatch, file: File, parserId: string) => {
  // dispatch(importProjectAction(file, parserId));
  dispatch(changeActiveMenu(null));
  clear();
};
