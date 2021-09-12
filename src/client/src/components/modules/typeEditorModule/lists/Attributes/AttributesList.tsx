import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { Aspect } from "../../../../../models";
import { ListHeader } from "../ListHeader";
import { AttributesListBody } from "./AttributesListBody";
import { ListWrapper } from "../../../../../compLibrary";
import { TextResources } from "../../../../../assets/text";
import { ModeEdit } from "../../helpers";
interface Props {
  state: TypeEditorState;
  disabled: boolean;
}

export const AttributesList = ({ state, disabled }: Props) => {
  const mode = state.mode;
  let aspect = ModeEdit(mode)
    ? state.selectedNode.aspect
    : state.createLibraryType.aspect;
  let filteredAttributes = [];

  if (state.attributes && aspect !== Aspect.NotSet) {
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
        disabled={ModeEdit(mode) ? false : disabled}
      />
    </ListWrapper>
  );
};

export default AttributesList;
