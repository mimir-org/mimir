import { Node as FlowNode } from "react-flow-renderer";
import { Node } from "../../../../../../models";

export const IsCheckedTree = (node: Node, selectedNodes: FlowNode[]): boolean => {
  return selectedNodes && selectedNodes.some((n) => n.id === node.id);
};
