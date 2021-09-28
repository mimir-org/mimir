import { ListType } from "../TypeEditorList";
import { TextResources } from "../../../../assets/text";

const GetListLabel = (listType: ListType): string => {
  if (listType === ListType.Rds) return TextResources.TypeEditor_Properties_RDS;
  if (listType === ListType.Terminals)
    return TextResources.TypeEditor_Properties_Terminals;
  if (listType === ListType.PredefinedAttributes)
    return TextResources.TypeEditor_Properties_Predefined_Location_Attributes;
  if (listType === ListType.ObjectAttributes)
    return TextResources.TypeEditor_Properties_Block_Attributes;
  if (listType === ListType.LocationAttributes)
    return TextResources.TypeEditor_Properties_Location_Attributes;
  if (listType === ListType.SimpleTypes)
    return TextResources.TypeEditor_Properties_Simple_Types;
  if (listType === ListType.Preview)
    return TextResources.TypeEditor_New_Type_Preview;
};

export default GetListLabel;
