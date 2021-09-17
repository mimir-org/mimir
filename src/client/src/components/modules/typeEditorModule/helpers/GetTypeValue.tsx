import { TextResources } from "../../../../assets/text";
import { Aspect, ObjectType } from "../../../../models";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";

const GetTypeValue = (state: TypeEditorState, label: string) => {
  if (label === TextResources.TypeEditor_Aspect)
    return Aspect[state.createLibraryType.aspect];
  if (label === TextResources.TypeEditor_Object_Type)
    return ObjectType[state.createLibraryType.objectType];
  if (label === "typeName") return state.createLibraryType.name;
  if (label === "rdsName") return state.rdsName;
  if (label === "symbol") return state.createLibraryType.symbolId;
};

export default GetTypeValue;
