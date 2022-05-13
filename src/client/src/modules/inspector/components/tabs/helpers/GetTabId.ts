import { TextResources } from "../../../../../assets/text/TextResources";

export const GetTabId = (index: number) => {
  if (index === 1) return TextResources.PARAMETERS;
  if (index === 2) return TextResources.TERMINALS;
  if (index === 3) return TextResources.RELATIONS;
  if (index === 4) return TextResources.SIMPLE_TYPES;
};
