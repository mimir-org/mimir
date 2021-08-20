import { TerminalsListElement } from "./TerminalsListElement";
import { AttributesListElement } from "./AttributesListElement";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { IsFunction, ModeEdit } from "../../helpers";
import { ListElementsContainer } from "../../../../../compLibrary";

interface Props {
  state: TypeEditorState;
  terminals: any[];
  disabled: boolean;
}

export const TerminalsListBody = ({ state, terminals, disabled }: Props) => {
  let aspect = ModeEdit(state.mode)
    ? state.selectedNode.aspect
    : state.createLibraryType.aspect;

  return (
    <ListElementsContainer background={false}>
      {terminals && !disabled ? (
        <>
          {IsFunction(aspect)
            ? terminals.map((element) => (
                <TerminalsListElement
                  key={element[1].key}
                  state={state}
                  terminals={element[1].value}
                  category={element[1].key}
                />
              ))
            : terminals.map((element) => (
                <AttributesListElement
                  key={element[1].key}
                  name={element[1].key}
                  values={element[1].values}
                  isMultiSelect={element[1].isMultiSelect}
                  state={state}
                />
              ))}
        </>
      ) : null}
    </ListElementsContainer>
  );
};

export default TerminalsListBody;
