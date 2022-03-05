import { TextResources } from "../../../../../assets/text/TextResources";

export const GetInspectorText = (index: number) => {
  if (index === 0) return TextResources.Inspector_AdminInfo;
  if (index === 1) return TextResources.Inspector_Parameters;
  if (index === 2) return TextResources.Inspector_Terminals;
  if (index === 3) return TextResources.Inspector_Relations;
  if (index === 4) return TextResources.Inspector_SimpleTypes;
};
