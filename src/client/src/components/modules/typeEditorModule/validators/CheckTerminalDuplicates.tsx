import { TerminalTypeItem } from "../../../../models";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { ModeEdit } from "../helpers";

const CheckTerminalDuplicates = (
  state: TypeEditorState,
  terminal: TerminalTypeItem
) => {
  if (ModeEdit(state.mode)) {
    return state.selectedNode.terminalTypes.includes(terminal);
  } else {
    return state.createLibraryType.terminalTypes.includes(terminal);
  }
};

export default CheckTerminalDuplicates;
