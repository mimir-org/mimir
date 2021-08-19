import { TextResources } from "../../../../assets/text";
import { Aspect, ObjectType } from "../../../../models";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";

const GetTypeValue = (state: TypeEditorState, label: string) => {
  if (label === TextResources.TypeEditor_Aspect)
    return Aspect[state.selectedNode.aspect];
  if (label === TextResources.TypeEditor_Object_Type)
    return ObjectType[state.selectedNode.objectType];
  if (label === "typeName") return state.selectedNode.name;
  if (label === "symbol") return state.selectedNode.symbolId;
};

export default GetTypeValue;
