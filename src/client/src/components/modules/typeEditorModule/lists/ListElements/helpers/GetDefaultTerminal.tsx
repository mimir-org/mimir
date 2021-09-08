import { TypeEditorState } from "../../../../../../redux/store/typeEditor/types";
import { IsTransport, IsInterface, ModeEdit } from "../../../helpers";

const GetDefaultTerminal = (state: TypeEditorState, terminals: any[]) => {
  const selectedNode = ModeEdit(state.mode)
    ? state.selectedNode
    : state.createLibraryType;
  const terminal = terminals.find((t) => t.id === selectedNode.terminalTypeId);
  if (
    ModeEdit(state.mode) &&
    selectedNode &&
    (IsTransport(selectedNode.objectType) ||
      IsInterface(selectedNode.objectType))
  ) {
    return terminal;
  } else {
    return null;
  }
};

export default GetDefaultTerminal;
