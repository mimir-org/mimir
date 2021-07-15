import { TypeEditorState } from "../../../../redux/store/typeEditor/types";

const ValidateType = (state: TypeEditorState) => {
  console.log("test ", state.createLibraryType.terminalTypes.length);
  return (
    state.createLibraryType.name !== "" &&
    state.createLibraryType.rdsId !== "" &&
    state.createLibraryType.terminalTypes.length > 1
  );
};

export default ValidateType;
