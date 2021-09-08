import { TypeEditorState } from "../../../../../../redux/store/typeEditor/types";
import { IsObjectBlock, ModeEdit } from "../../../helpers";

const GetDefaultQuantity = (state: TypeEditorState) => {
  if (
    ModeEdit(state.mode) &&
    state.selectedNode &&
    IsObjectBlock(state.selectedNode.objectType)
  ) {
    return state.selectedNode.terminalTypes.length;
  } else {
    return 0;
  }
};

export default GetDefaultQuantity;
