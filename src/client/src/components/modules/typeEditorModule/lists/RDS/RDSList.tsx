import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";

import { ListHeader } from "../ListHeader";
import { RDSListBody } from "./RDSListBody";
import { ListWrapper } from "../../../../../componentLibrary";
import { TextResources } from "../../../../../assets/textResources";

export const RDSList = () => {
  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  return (
    <ListWrapper flex={0.5}>
      <ListHeader
        label={TextResources.TypeEditor_Properties_RDS}
        chooseVisible={true}
      />
      <RDSListBody listElements={Object.entries(state.rdsList)} />
    </ListWrapper>
  );
};

export default RDSList;
