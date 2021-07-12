import { TerminalsListElement } from "./TerminalsListElement";
import { AttributesListElement } from "./AttributesListElement";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { IsFunctionAspect, IsLocationAspect } from "../../helpers";

interface Props {
  state: TypeEditorState;
  terminals: any[];
}

export const TerminalsListBody = ({ state, terminals }: Props) => {
  const aspect = state.createLibraryType.aspect;

  return (
    <>
      {IsFunctionAspect(aspect) && terminals
        ? terminals.map((element) => (
            <TerminalsListElement
              key={element[1].key}
              state={state}
              terminals={element[1].value}
              category={element[1].key}
            />
          ))
        : IsLocationAspect(aspect) && terminals
        ? terminals.map((element) => (
            <AttributesListElement
              key={element[1].key}
              name={element[1].key}
              values={element[1].values}
              isMultiSelect={element[1].isMultiSelect}
              state={state}
            />
          ))
        : null}
    </>
  );
};

export default TerminalsListBody;
