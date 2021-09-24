import { TextResources } from "../../../assets/text";

const GetTabId = (index: number) => {
  if (index === 1) return TextResources.Inspector_Parameters;
  if (index === 2) return TextResources.Inspector_Terminals;
  if (index === 2) return TextResources.Inspector_Relations;
};

export default GetTabId;
