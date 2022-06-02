import { GetSelectedFlowNodes } from "../../../../../../helpers/Selected";

export const IsNodeInTreeExplorerChecked = (nodeId: string) => {
  const selectedFlowNodes = GetSelectedFlowNodes();
  return selectedFlowNodes?.some((n) => n.id === nodeId);
};
