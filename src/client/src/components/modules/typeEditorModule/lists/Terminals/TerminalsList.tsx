import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { Aspect, ObjectType } from "../../../../../models";

import { ListHeader } from "../ListHeader";
import { TerminalsListBody } from "./TerminalsListBody";
import { ListWrapper } from "../../../../../compLibrary";

import { TextResources } from "../../../../../assets/textResources";

export const TerminalsList = () => {
  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const TerminalsList = () => {
    if (state.terminals) {
      let filteredTerminals = Object.entries(state.terminals);
      if (
        state.createLibraryType.aspect === Aspect.NotSet ||
        state.createLibraryType.objectType === ObjectType.NotSet ||
        state.createLibraryType.name === ""
      ) {
        filteredTerminals = [];
      }
      return filteredTerminals;
    }
  };

  return (
    <ListWrapper flex={0.8}>
      <ListHeader
        label={TextResources.TypeEditor_Properties_Terminals}
        chooseVisible={true}
      />
      <TerminalsListBody listElements={TerminalsList()} />
    </ListWrapper>
  );
};

export default TerminalsList;
