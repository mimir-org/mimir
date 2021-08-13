import { Aspect, ObjectType, Status } from "../../../../models";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";

const GetTypeValue = (
  state: TypeEditorState,
  type: Aspect | ObjectType | Status | "typeName" | "symbol"
) => {
  if (type === Aspect.NotSet) {
    return Aspect[state.selectedNode.aspect];
  } else if (type === ObjectType.NotSet) {
    return ObjectType[state.selectedNode.objectType];
  } else if (type === Status.NotSet) {
    return Status[state.selectedNode.status];
  } else if (type === "typeName") {
    return state.selectedNode.name;
  } else if (type === "symbol") {
    return state.selectedNode.symbolId;
  }
};

export default GetTypeValue;
