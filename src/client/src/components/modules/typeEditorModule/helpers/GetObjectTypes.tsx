import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { IsFunction, IsLocation } from "./";

const GetObjectTypes = (state: TypeEditorState) => {
  const aspect = state.createLibraryType.aspect;

  if (IsFunction(aspect)) return Object.entries(state.objectTypes);
  else if (IsLocation(aspect)) return Object.entries(state.locationTypes);
};

export default GetObjectTypes;
