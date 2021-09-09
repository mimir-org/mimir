import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { ModeNew, ModeEdit } from "../../helpers";

const GetSymbol = (state: TypeEditorState) => {
  if (ModeNew(state.mode) && state.createLibraryType?.symbolId) {
    return state.icons?.find((i) => i.id === state.createLibraryType.symbolId);
  } else if (ModeEdit(state.mode) && state.selectedNode?.symbolId) {
    return state.icons?.find((i) => i.id === state.selectedNode.symbolId);
  }
};

export default GetSymbol;
