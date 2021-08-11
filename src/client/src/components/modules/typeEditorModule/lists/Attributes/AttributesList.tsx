import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { Aspect } from "../../../../../models";
import { ListHeader } from "../ListHeader";
import { AttributesListBody } from "./AttributesListBody";
import { ListWrapper } from "../../../../../compLibrary";
import { TextResources } from "../../../../../assets/text";

interface Props {
  state: TypeEditorState;
  disabled: boolean;
}

export const AttributesList = ({ state, disabled }: Props) => {
  let filteredAttributes = [];
  if (state.attributes && state.createLibraryType.aspect !== Aspect.NotSet) {
    filteredAttributes = Object.entries(state.attributes);
  }

  return (
    <ListWrapper flex={0.7} disabled={disabled}>
      <ListHeader
        label={TextResources.TypeEditor_Properties_Block_Attributes}
        chooseVisible={true}
      />
      <AttributesListBody
        listElements={filteredAttributes}
        disabled={disabled}
      />
    </ListWrapper>
  );
};

export default AttributesList;
