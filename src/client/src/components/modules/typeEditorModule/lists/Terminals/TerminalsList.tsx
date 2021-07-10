import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { Aspect } from "../../../../../models";
import { ListHeader } from "../ListHeader";
import { TerminalsListBody } from "./TerminalsListBody";
import { ListWrapper } from "../../../../../compLibrary";
import { TextResources } from "../../../../../assets/text";

interface Props {
  state: TypeEditorState;
}

export const TerminalsList = ({ state }: Props) => {
  const aspect = state.createLibraryType.aspect;
  let terminals = [];

  if (aspect === Aspect.Function && state.terminals) {
    terminals = Object.entries(state.terminals);
  } else if (aspect === Aspect.Location && state.predefinedAttributes) {
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
      <TerminalsListBody state={state} listElements={terminals} />
    </ListWrapper>
  );
};

export default TerminalsList;
