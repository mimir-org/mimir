import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";

import { ListHeader } from "../ListHeader";
import { TerminalsListBody } from "./TerminalsListBody";
import { ListWrapper } from "../../../../../compLibrary";

import { TextResources } from "../../../../../assets/textResources";

export const TerminalsList = () => {
  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  return (
    <ListWrapper flex={2}>
      <ListHeader
        label={TextResources.TypeEditor_Properties_Terminals}
        chooseVisible={true}
      />
      <TerminalsListBody
        listElements={state.terminals && Object.entries(state.terminals)}
      />
    </ListWrapper>
  );
};

export default TerminalsList;
