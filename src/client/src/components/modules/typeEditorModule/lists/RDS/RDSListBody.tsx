import { RDSListElement } from "../RDS/RDSListElement";
import {
  ListElementsContainer,
  VerticalScrollbar,
} from "../../../../../compLibrary";

interface Props {
  listElements: any;
}

export const RDSListBody = ({ listElements }: Props) => {
  return (
    <VerticalScrollbar height={200}>
      <ListElementsContainer>
        {listElements &&
          listElements.map((element) => (
            <>
              <RDSListElement key={element[1].id} name={element[1].name} />
            </>
          ))}
      </ListElementsContainer>
    </VerticalScrollbar>
  );
};

export default RDSListBody;
