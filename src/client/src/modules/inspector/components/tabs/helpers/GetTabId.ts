import { TextResources } from "../../../../../assets/text/TextResources";

export const GetTabId = (index: number) => {
  if (index === 1) return TextResources.INSPECTOR_PARAMETERS;
  if (index === 2) return TextResources.INSPECTOR_TERMINALS;
  if (index === 3) return TextResources.INSPECTOR_RELATIONS;
  if (index === 4) return TextResources.INSPECTOR_SIMPLETYPES;
};
