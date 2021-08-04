import { TextResources } from "../../../../assets/text";
import { Aspect, ObjectType, Status } from "../../../../models";

const GetDefaultValue = (type: Aspect | ObjectType | Status | "typeName") => {
  if (type === Aspect.NotSet)
    return TextResources.TypeEditor_Aspect_Placeholder;
  if (type === Status.NotSet)
    return TextResources.TypeEditor_Status_Placeholder;
  if (type === ObjectType.NotSet)
    return TextResources.TypeEditor_Object_Placeholder;
  if (type === "typeName") return "";
};

export default GetDefaultValue;
