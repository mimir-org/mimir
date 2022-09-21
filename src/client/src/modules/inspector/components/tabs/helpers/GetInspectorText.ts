import { TextResources } from "../../../../../assets/text/TextResources";

export const GetInspectorText = (index: number) => {
  if (index === 0) return TextResources.ADMIN_INFO;
  if (index === 1) return TextResources.ATTRIBUTES;
  if (index === 2) return TextResources.TERMINAL_ATTRIBUTES;
  if (index === 3) return TextResources.RELATIONS;
};
