import { ListElementsContainer } from "../../../../../componentLibrary";
import { VerticalScrollbar } from "../../../../../componentLibrary";
import { AttributesListElement } from "../Attributes/AttributesListElement";

export const AttributesListBody = () => {
  return (
    <VerticalScrollbar height={200}>
      <ListElementsContainer>
        <AttributesListElement />
        <AttributesListElement />
        <AttributesListElement />
        <AttributesListElement />
        <AttributesListElement />
        <AttributesListElement />
        <AttributesListElement />
        <AttributesListElement />
        <AttributesListElement />
        <AttributesListElement />
        <AttributesListElement />
        <AttributesListElement />
      </ListElementsContainer>
    </VerticalScrollbar>
  );
};

export default AttributesListBody;
