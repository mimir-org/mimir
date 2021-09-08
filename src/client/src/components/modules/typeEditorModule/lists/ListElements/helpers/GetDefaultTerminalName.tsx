import { TypeEditorState } from "../../../../../../redux/store/typeEditor/types";
import { ModeNew, ModeEdit } from "../../../helpers";

const GetDefaultTerminalName = (
  state: TypeEditorState,
  selectedTerminal?: any
) => {
  if (ModeNew(state.mode)) {
    return "";
  } else if (ModeEdit(state.mode) && selectedTerminal) {
    return selectedTerminal.name;
  }
};

export default GetDefaultTerminalName;
