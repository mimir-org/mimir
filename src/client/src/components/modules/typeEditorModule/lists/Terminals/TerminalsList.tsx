import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { Aspect } from "../../../../../models";

import { ListHeader } from "../ListHeader";
import { TerminalsListBody } from "./TerminalsListBody";
import { ListWrapper } from "../../../../../compLibrary";

import { TextResources } from "../../../../../assets/textResources";

interface Props {
  aspect: Aspect;
}

export const TerminalsList = ({ aspect }: Props) => {
  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const TerminalsList = () => {
    if (state.terminals) {
      let filteredTerminals = Object.entries(state.terminals);
      if (aspect === Aspect.NotSet) {
        filteredTerminals = [];
      }
      return filteredTerminals;
    }
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
      <TerminalsListBody listElements={TerminalsList()} />
    </ListWrapper>
  );
};

export default TerminalsList;
