import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { Aspect } from "../../../../../models";
import { ListHeader } from "../ListHeader";
import { AttributesListBody } from "./AttributesListBody";
import { ListWrapper } from "../../../../../compLibrary";
import { TextResources } from "../../../../../assets/text";

export const AttributesList = () => {
  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const AttributesList = () => {
    if (state.attributes) {
      let filteredAttributes = Object.entries(state.attributes);
      if (state.createLibraryType.aspect === Aspect.NotSet) {
        filteredAttributes = [];
      }
      return filteredAttributes;
    }
  };

  return (
    <ListWrapper flex={0.7}>
      <ListHeader
        label={TextResources.TypeEditor_Properties_Block_Attributes}
        chooseVisible={true}
      />
      <AttributesListBody listElements={AttributesList()} />
    </ListWrapper>
  );
};

export default AttributesList;
