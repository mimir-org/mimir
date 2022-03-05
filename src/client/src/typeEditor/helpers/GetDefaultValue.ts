import { TextResources } from "../../assets/text/TextResources";
import { Aspect, ObjectType } from "../../models";

const GetDefaultValue = (type: Aspect | ObjectType | "typeName") => {
  if (type === Aspect.NotSet) return TextResources.TypeEditor_Aspect_Placeholder;
  if (type === ObjectType.NotSet) return TextResources.TypeEditor_Object_Placeholder;
  if (type === "typeName") return "";
};

export default GetDefaultValue;
