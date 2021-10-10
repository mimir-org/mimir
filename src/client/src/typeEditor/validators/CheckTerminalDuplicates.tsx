import { TerminalTypeItem } from "../../models";
import { TypeEditorState } from "../redux/types";

const CheckTerminalDuplicates = (state: TypeEditorState, terminal: TerminalTypeItem) => {
  return state.createLibraryType.terminalTypes.includes(terminal);
};

export default CheckTerminalDuplicates;
