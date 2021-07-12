import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { IsFunction, IsLocation } from "./";

const GetObjectTypes = (state: TypeEditorState) => {
  if (IsFunction(state.createLibraryType.aspect))
    return Object.entries(state.objectTypes);
  else if (IsLocation(state.createLibraryType.aspect))
    return Object.entries(state.locationTypes);
};

export default GetObjectTypes;
