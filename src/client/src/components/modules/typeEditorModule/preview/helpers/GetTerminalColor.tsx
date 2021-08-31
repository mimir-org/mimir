import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { ModeNew } from "../../helpers";

const GetTerminalColor = (state: TypeEditorState) => {
  const selectedTerminalId = state.selectedNode.terminalTypeId;
  const terminalsValues = state.terminals.map((t) => t["value"]);
  const selectedTerminal = terminalsValues[0].find(
    (t) => t.id === selectedTerminalId
  );
  return ModeNew(state.mode) ? state.terminalColor : selectedTerminal.color;
};

export default GetTerminalColor;
