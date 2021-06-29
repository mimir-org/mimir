import { VerticalScrollbar } from "../../../../../compLibrary";
import { TerminalsListElement } from "./TerminalsListElement";
import { AttributesListElement } from "./AttributesListElement";
import { Aspect } from "../../../../../models";

interface Props {
  aspect: Aspect;
  listElements: any;
}

export const TerminalsListBody = ({ aspect, listElements }: Props) => {
  return (
    <VerticalScrollbar height={200}>
      {aspect === Aspect.Function && listElements
        ? listElements.map((element) => (
            <TerminalsListElement
              key={element[1].key}
              id={element[1].key}
              terminals={element[1].value}
              category={element[1].key}
            />
          ))
        : aspect === Aspect.Location && listElements
        ? listElements.map((element) => (
            <AttributesListElement
              key={element[1].key}
              name={element[1].key}
              values={element[1].values}
              isMultiSelect={element[1].isMultiSelect}
            />
          ))
        : null}
    </VerticalScrollbar>
  );
};

export default TerminalsListBody;
