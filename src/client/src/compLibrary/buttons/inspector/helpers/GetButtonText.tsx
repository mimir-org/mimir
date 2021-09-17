import { TextResources } from "../../../../assets/text";

const GetButtonText = (type: string) => {
  if (type === "delete") return TextResources.Inspector_Delete_Node;
  if (type === "filter") return TextResources.Inspector_Filter;
  if (type === "lock") return TextResources.Inspector_Lock;
  if (type === "validate") return TextResources.Inspector_Validate;
};

export default GetButtonText;
