import { VerticalScrollbar } from "../../../../../compLibrary";
import { TerminalsListElement } from "./TerminalsListElement";

interface Props {
  listElements: any;
}

export const TerminalsListBody = ({ listElements }: Props) => {
  return (
    <VerticalScrollbar height={200}>
      {listElements &&
        listElements.map((element) => (
          <TerminalsListElement
            key={element[1].key}
            id={element[1].key}
            terminals={element[1].value}
            category={element[1].key}
          />
        ))}
    </VerticalScrollbar>
  );
};

export default TerminalsListBody;
