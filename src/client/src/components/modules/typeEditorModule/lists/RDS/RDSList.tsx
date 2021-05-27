import { ListHeader } from "../ListHeader";
import { RDSListBody } from "./RDSListBody";
import { ListWrapper } from "../../../../../componentLibrary";

import { TextResources } from "../../../../../assets/textResources";

interface Props {}

export const RDSList = ({}: Props) => {
  return (
    <ListWrapper>
      <ListHeader
        label={TextResources.TypeEditor_Properties_RDS}
        chooseVisible={true}
      />
      <RDSListBody />
    </ListWrapper>
  );
};

export default RDSList;
