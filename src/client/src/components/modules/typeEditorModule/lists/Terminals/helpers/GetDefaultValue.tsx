import { CreateLibraryType, TypeMode } from "../../../../../../models";
import { ModeEdit } from "../../../helpers";

const GetDefaultValue = (mode: TypeMode, selectedNode?: CreateLibraryType) => {
  if (ModeEdit(mode)) {
    return selectedNode.terminalTypes.length;
  } else {
    return 0;
  }
};

export default GetDefaultValue;
