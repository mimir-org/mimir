import { TextResources } from "../../../../assets/textResources";

const GetInspectorTextResource = (index: number) => {
  return index === 0
    ? TextResources.Inspector_AdminInfo
    : index === 1
    ? TextResources.Inspector_TechInfo
    : index === 2
    ? TextResources.Inspector_Terminals
    : index === 3
    ? TextResources.Inspector_Relations
    : index === 4
    ? TextResources.Inspector_Comments
    : index === 5
    ? TextResources.Inspector_Changelog
    : TextResources.Inspector_Object;
};

export default GetInspectorTextResource;
