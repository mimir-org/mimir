import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { Aspect } from "../../../../../models";
import { ListHeader } from "../ListHeader";
import { TerminalsListBody } from "./TerminalsListBody";
import { ListWrapper } from "../../../../../compLibrary";
import { TextResources } from "../../../../../assets/text";

interface Props {
  aspect: Aspect;
}

export const TerminalsList = ({ aspect }: Props) => {
  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const TerminalsList = () => {
    let filteredTerminals = [];
    if (aspect === Aspect.Function && state.terminals) {
      filteredTerminals = Object.entries(state.terminals);
    } else if (aspect === Aspect.Location && state.predefinedAttributes) {
      filteredTerminals = Object.entries(state.predefinedAttributes);
    }
    return filteredTerminals;
  };

  return (
    <ListWrapper flex={0.8}>
      <ListHeader
        label={
          aspect === Aspect.Function
            ? TextResources.TypeEditor_Properties_Terminals
            : TextResources.TypeEditor_Properties_Location_Attributes
        }
        chooseVisible={true}
      />
      <TerminalsListBody aspect={aspect} listElements={TerminalsList()} />
    </ListWrapper>
  );
};

export default TerminalsList;
