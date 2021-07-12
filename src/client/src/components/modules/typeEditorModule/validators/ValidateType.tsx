import { TypeEditorState } from "../../../../redux/store/typeEditor/types";

const ValidateType = (state: TypeEditorState) => {
  if (state.createLibraryType.name !== "") return true;

  return false;
};

export default ValidateType;
