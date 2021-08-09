import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { ListHeader } from "../ListHeader";
import { RDSListBody } from "./RDSListBody";
import { ListWrapper } from "../../../../../compLibrary";
import { TextResources } from "../../../../../assets/text";
import { Aspect } from "../../../../../models";

interface Props {
  state: TypeEditorState;
  disabled: boolean;
}

export const RDSList = ({ state, disabled }: Props) => {
  const aspect = state.createLibraryType.aspect;
  let filteredRDS = [];

  if (state.rdsList && aspect !== Aspect.NotSet)
    filteredRDS = Object.entries(state.rdsList);

  return (
    <ListWrapper flex={0.7} disabled={disabled}>
      <ListHeader
        label={TextResources.TypeEditor_Properties_RDS}
        chooseVisible={true}
      />
      <RDSListBody elements={filteredRDS} disabled={disabled} />
    </ListWrapper>
  );
};

export default RDSList;
