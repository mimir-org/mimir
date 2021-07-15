import { Status } from "../../../../models";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";

const ValidateType = (state: TypeEditorState) => {
  return (
    state.createLibraryType.name !== "" &&
    state.createLibraryType.rdsId !== "" &&
    state.createLibraryType.status !== Status.NotSet &&
    state.createLibraryType.terminalTypes.length > 1 &&
    state.createLibraryType.attributeTypes.length > 0
  );
};

export default ValidateType;
