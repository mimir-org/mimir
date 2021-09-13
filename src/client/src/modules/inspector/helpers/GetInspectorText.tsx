import { TextResources } from "../../../assets/text";

const GetInspectorText = (index: number) => {
  if (index === 0) return TextResources.Inspector_AdminInfo;
  if (index === 1) return TextResources.Inspector_Parameters;
  if (index === 2) return TextResources.Inspector_Terminals;
  if (index === 3) return TextResources.Inspector_Relations;
  if (index === 4) return TextResources.Inspector_Comments;
  if (index === 5) return TextResources.Inspector_Changelog;
};

export default GetInspectorText;
