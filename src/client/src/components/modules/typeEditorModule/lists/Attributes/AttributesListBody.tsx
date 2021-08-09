import { AttributesListElement } from "./AttributesListElement";
import { ListElementsContainer } from "../../../../../compLibrary";

interface Props {
  listElements: any[];
  disabled: boolean;
}

export const AttributesListBody = ({ listElements, disabled }: Props) => (
  <ListElementsContainer>
    {disabled
      ? null
      : listElements?.map((element) => (
          <AttributesListElement key={element[1].id} attribute={element} />
        ))}
  </ListElementsContainer>
);

export default AttributesListBody;
