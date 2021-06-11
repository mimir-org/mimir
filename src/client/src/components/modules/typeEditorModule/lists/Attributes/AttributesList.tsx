import { ListHeader } from "../ListHeader";
import { AttributesListBody } from "./AttributesListBody";
import { ListWrapper } from "../../../../../componentLibrary";
import { TextResources } from "../../../../../assets/textResources";

export const AttributesList = () => {
  return (
    <ListWrapper width={204}>
      <ListHeader
        label={TextResources.TypeEditor_Properties_Block_Attributes}
        chooseVisible={true}
      />
      <AttributesListBody />
    </ListWrapper>
  );
};

export default AttributesList;
