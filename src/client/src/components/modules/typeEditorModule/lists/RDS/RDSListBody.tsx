import { ListElementsContainer } from "../../../../../componentLibrary";
import { VerticalScrollbar } from "../../../../../componentLibrary";
import { RDSListElement } from "../RDS/RDSListElement";

interface Props {}

export const RDSListBody = ({}: Props) => {
  return (
    <VerticalScrollbar height={200}>
      <ListElementsContainer>
        <RDSListElement />
        <RDSListElement />
        <RDSListElement />
        <RDSListElement />
        <RDSListElement />
        <RDSListElement />
        <RDSListElement />
        <RDSListElement />
        <RDSListElement />
        <RDSListElement />
        <RDSListElement />
        <RDSListElement />
      </ListElementsContainer>
    </VerticalScrollbar>
  );
};

export default RDSListBody;
