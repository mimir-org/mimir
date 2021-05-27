import { ListElementsContainer } from "../../../../../componentLibrary";
import { VerticalScrollbar } from "../../../../../componentLibrary";
import { AttributesListElement } from "../Attributes/AttributesListElement";

interface Props {}

export const AttributesListBody = ({}: Props) => {
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
