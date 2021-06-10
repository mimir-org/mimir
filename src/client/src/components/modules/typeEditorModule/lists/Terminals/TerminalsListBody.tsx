// import { useSelector } from "react-redux";
// import { RootState } from "../../../../../redux/store";
// import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";

import { VerticalScrollbar } from "../../../../../componentLibrary";
import { TerminalsListElement } from "./TerminalsListElement";
import { TerminalListContainer } from "../../styled";

interface Props {
  listElements: any;
}

export const TerminalsListBody = ({ listElements }: Props) => {
  //   const state = useSelector<RootState>(
  //     (state) => state.typeEditor
  //   ) as TypeEditorState;

  return (
    <VerticalScrollbar height={200}>
      <TerminalListContainer>
        {listElements?.map((element) => (
          <>
            <TerminalsListElement
              key={element[1].id}
              name={element[1].terminalCategory}
            />
          </>
        ))}
      </TerminalListContainer>
    </VerticalScrollbar>
  );
};

export default TerminalsListBody;
