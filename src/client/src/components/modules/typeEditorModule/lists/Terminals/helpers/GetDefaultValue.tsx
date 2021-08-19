import { CreateLibraryType, TypeMode } from "../../../../../../models";
import { ModeEdit } from "../../../helpers";

const GetDefaultValue = (mode: TypeMode, selectedNode?: CreateLibraryType) => {
  if (ModeEdit(mode) && selectedNode) {
    return selectedNode.terminalTypes.length;
  } else {
    return 0;
  }
};

export default GetDefaultValue;
