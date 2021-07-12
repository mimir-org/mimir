import { TypeEditorState } from "../../../../redux/store/typeEditor/types";

const ValidateType = (state: TypeEditorState) => {
  if (state.createLibraryType.name === "") return false;
  else if (state.createLibraryType.rdsId === "") return false;

  return true;
};

export default ValidateType;
