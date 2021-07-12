import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { Aspect } from "../../../../../models";
import { ListHeader } from "../ListHeader";
import { TerminalsListBody } from "./TerminalsListBody";
import { ListWrapper } from "../../../../../compLibrary";
import { TextResources } from "../../../../../assets/text";
import { IsFunctionAspect, IsLocationAspect } from "../../helpers";

interface Props {
  state: TypeEditorState;
}

export const TerminalsList = ({ state }: Props) => {
  const aspect = state.createLibraryType.aspect;
  let terminals = [];

  if (IsFunctionAspect(aspect) && state.terminals) {
    terminals = Object.entries(state.terminals);
  } else if (IsLocationAspect(aspect) && state.predefinedAttributes) {
    terminals = Object.entries(state.predefinedAttributes);
  }

  return (
    <ListWrapper flex={0.8}>
      <ListHeader
        label={
          state.createLibraryType.aspect === Aspect.Function
            ? TextResources.TypeEditor_Properties_Terminals
            : TextResources.TypeEditor_Properties_Location_Attributes
        }
        chooseVisible={true}
      />
      <TerminalsListBody state={state} terminals={terminals} />
    </ListWrapper>
  );
};

export default TerminalsList;
