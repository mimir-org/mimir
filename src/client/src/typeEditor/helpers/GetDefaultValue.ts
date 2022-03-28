import { Aspect, ObjectType } from "../../models";
import { TypeEditorTextResources } from "../assets/TypeEditorTextResources";

const GetDefaultValue = (type: Aspect | ObjectType | "typeName") => {
  if (type === Aspect.NotSet) return TypeEditorTextResources.ASPECT_PLACEHOLDER;
  if (type === ObjectType.NotSet) return TypeEditorTextResources.OBJECT_PLACEHOLDER;
  if (type === "typeName") return "";
};

export default GetDefaultValue;
