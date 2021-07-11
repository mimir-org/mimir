import { AttributesListElement } from "./AttributesListElement";
import { ListElementsContainer } from "../../../../../compLibrary";

interface Props {
  listElements: any[];
}

export const AttributesListBody = ({ listElements }: Props) => (
  <ListElementsContainer>
    {listElements?.map((element) => (
      <AttributesListElement key={element[1].id} attribute={element} />
    ))}
  </ListElementsContainer>
);

export default AttributesListBody;
