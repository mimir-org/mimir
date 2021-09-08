import { ListType } from "../TypeEditorList";
import { TextResources } from "../../../../assets/text";

const GetListLabel = (listType: ListType): string => {
  if (listType === ListType.Rds) return TextResources.TypeEditor_Properties_RDS;
  if (listType === ListType.Terminals)
    return TextResources.TypeEditor_Properties_Terminals;
};

export default GetListLabel;
