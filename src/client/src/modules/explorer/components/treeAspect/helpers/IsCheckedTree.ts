import { Node } from "../../../../../models";

export const IsCheckedTree = (node: Node, selectedNodes: string[]): boolean => {
  return selectedNodes && selectedNodes.includes(node.id);
};
