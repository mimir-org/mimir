import { AttributesListElement } from "./AttributesListElement";
import { ListElementsContainer } from "../../../../../compLibrary";
import { VerticalScrollbar } from "../../../../../compLibrary";

interface Props {
  listElements: any;
}

export const AttributesListBody = ({ listElements }: Props) => {
  return (
    <VerticalScrollbar height={200}>
      <ListElementsContainer>
        {listElements &&
          listElements.map((element) => (
            <AttributesListElement key={element[1].id} attribute={element} />
          ))}
      </ListElementsContainer>
    </VerticalScrollbar>
  );
};

export default AttributesListBody;
