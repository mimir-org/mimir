import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { ListHeader } from "../ListHeader";
import { TerminalsListBody } from "./TerminalsListBody";
import { ListWrapper } from "../../../../../compLibrary";
import { TextResources } from "../../../../../assets/text";
import { IsFunction, IsLocation, ModeEdit } from "../../helpers";

interface Props {
  state: TypeEditorState;
  disabled: boolean;
}

export const TerminalsList = ({ state, disabled }: Props) => {
  const mode = state.mode;
  let aspect = ModeEdit(mode)
    ? state.selectedNode.aspect
    : state.createLibraryType.aspect;
  let terminals = [];

  if (IsFunction(aspect) && state.terminals) {
    terminals = Object.entries(state.terminals);
  } else if (IsLocation(aspect) && state.predefinedAttributes) {
    terminals = Object.entries(state.predefinedAttributes);
  }

  return (
    <ListWrapper flex={0.8} disabled={disabled}>
      <ListHeader
        label={
          IsFunction(aspect)
            ? TextResources.TypeEditor_Properties_Terminals
            : TextResources.TypeEditor_Properties_Location_Attributes
        }
        chooseVisible={true}
      />
      <TerminalsListBody
        state={state}
        terminals={terminals}
        disabled={ModeEdit(mode) ? false : disabled}
      />
    </ListWrapper>
  );
};

export default TerminalsList;
