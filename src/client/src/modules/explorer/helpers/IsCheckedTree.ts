import { Node } from "../../../models";

const IsCheckedTree = (node: Node, selectedNodes: string[]): boolean => {
  return selectedNodes && selectedNodes.includes(node.id);
};

export default IsCheckedTree;
