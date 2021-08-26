import { CreateLibraryType } from "../../../../../../models";
import { TypeEditorState } from "../../../../../../redux/store/typeEditor/types";
import { IsObjectBlock, ModeEdit } from "../../../helpers";

const GetDefaultQuantity = (
  state: TypeEditorState,
  selectedNode: CreateLibraryType
) => {
  if (
    ModeEdit(state.mode) &&
    selectedNode &&
    IsObjectBlock(selectedNode.objectType)
  ) {
    return selectedNode.terminalTypes.length;
  } else {
    return 0;
  }
};

export default GetDefaultQuantity;
