import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { ListHeader } from "../ListHeader";
import { RDSListBody } from "./RDSListBody";
import { ListWrapper } from "../../../../../compLibrary";
import { TextResources } from "../../../../../assets/textResources";
import { Aspect, ObjectType } from "../../../../../models";

export const RDSList = () => {
  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const RDSList = () => {
    if (state.rdsList) {
      let filteredRDS = Object.entries(state.rdsList);
      if (
        state.createLibraryType.aspect === Aspect.NotSet ||
        state.createLibraryType.objectType === ObjectType.NotSet ||
        state.createLibraryType.name === ""
      ) {
        filteredRDS = [];
      }
      return filteredRDS;
    }
  };

  return (
    <ListWrapper flex={0.5}>
      <ListHeader
        label={TextResources.TypeEditor_Properties_RDS}
        chooseVisible={true}
      />
      <RDSListBody listElements={RDSList()} />
    </ListWrapper>
  );
};

export default RDSList;
