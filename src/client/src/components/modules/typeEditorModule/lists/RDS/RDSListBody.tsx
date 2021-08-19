import { RDSListElement } from "../RDS/RDSListElement";
import { ListElementsContainer } from "../../../../../compLibrary";

interface Props {
  elements: any[];
  disabled: boolean;
}

export const RDSListBody = ({ elements, disabled }: Props) => (
  <ListElementsContainer>
    {!disabled
      ? elements?.map((element) => (
          <RDSListElement
            key={element[1].id}
            id={element[1].id}
            name={element[1].name}
          />
        ))
      : null}
  </ListElementsContainer>
);

export default RDSListBody;
