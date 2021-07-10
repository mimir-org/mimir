import { TerminalsListElement } from "./TerminalsListElement";
import { AttributesListElement } from "./AttributesListElement";
import { Aspect } from "../../../../../models";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";

interface Props {
  state: TypeEditorState;
  listElements: any;
}

export const TerminalsListBody = ({ state, listElements }: Props) => (
  <>
    {state.createLibraryType.aspect === Aspect.Function && listElements
      ? listElements.map((element) => (
          <TerminalsListElement
            key={element[1].key}
            state={state}
            terminals={element[1].value}
            category={element[1].key}
          />
        ))
      : state.createLibraryType.aspect === Aspect.Location && listElements
      ? listElements.map((element) => (
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

export default TerminalsListBody;
