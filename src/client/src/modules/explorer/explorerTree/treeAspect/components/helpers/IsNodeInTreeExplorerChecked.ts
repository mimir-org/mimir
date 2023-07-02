import { useGetSelectedFlowNodes } from "hooks/useGetSelectedFlowNodes";

export const IsNodeInTreeExplorerChecked = (nodeId: string) => {
  const selectedFlowNodes = useGetSelectedFlowNodes();
  return selectedFlowNodes?.some((n) => n.id === nodeId);
};
