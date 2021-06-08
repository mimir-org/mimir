import { ListHeader } from "../ListHeader";
import { AttributesListBody } from "./AttributesListBody";
import { ListWrapper } from "../../../../../componentLibrary";

import { TextResources } from "../../../../../assets/textResources";

interface Props {}

export const AttributesList = ({}: Props) => {
  return (
    <ListWrapper flex={1}>
      <ListHeader
        label={TextResources.TypeEditor_Properties_Block_Attributes}
        chooseVisible={true}
      />
      <AttributesListBody />
    </ListWrapper>
  );
};

export default AttributesList;
