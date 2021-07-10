import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { ListHeader } from "../ListHeader";
import { RDSListBody } from "./RDSListBody";
import { ListWrapper } from "../../../../../compLibrary";
import { TextResources } from "../../../../../assets/text";
import { Aspect } from "../../../../../models";

interface Props {
  state: TypeEditorState;
}

export const RDSList = ({ state }: Props) => {
  const RDSList = () => {
    if (state.rdsList) {
      let filteredRDS = Object.entries(state.rdsList);
      if (state.createLibraryType.aspect === Aspect.NotSet) {
        filteredRDS = [];
      }
      return filteredRDS;
    }
  };

  return (
    <ListWrapper flex={0.7}>
      <ListHeader
        label={TextResources.TypeEditor_Properties_RDS}
        chooseVisible={true}
      />
      <RDSListBody listElements={RDSList()} />
    </ListWrapper>
  );
};

export default RDSList;
