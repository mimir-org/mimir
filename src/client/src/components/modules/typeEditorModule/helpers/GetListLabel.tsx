import { ListType } from "../TypeEditorList";
import { TextResources } from "../../../../assets/text";
import { ObjectType } from "../../../../models";

const GetListLabel = (listType: ListType, objectType: ObjectType): string => {
  if (listType === ListType.Rds) return TextResources.TypeEditor_Properties_RDS;
  if (
    listType === ListType.Terminals &&
    (objectType === ObjectType.NotSet ||
      objectType === ObjectType.ObjectBlock ||
      objectType === ObjectType.Composite)
  )
    return TextResources.TypeEditor_Properties_Terminals;
  if (
    (listType === ListType.Terminals ||
      listType === ListType.PredefinedAttributes) &&
    (objectType === ObjectType.NotSet ||
      objectType === ObjectType.Transport ||
      objectType === ObjectType.Interface)
  )
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
