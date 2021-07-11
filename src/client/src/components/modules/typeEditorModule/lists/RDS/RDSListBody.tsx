import { RDSListElement } from "../RDS/RDSListElement";
import { ListElementsContainer } from "../../../../../compLibrary";

interface Props {
  elements: any[];
}

export const RDSListBody = ({ elements }: Props) => (
  <ListElementsContainer>
    {elements.map((element) => (
      <RDSListElement
        key={element[1].id}
        id={element[1].id}
        name={element[1].name}
      />
    ))}
  </ListElementsContainer>
);

export default RDSListBody;
