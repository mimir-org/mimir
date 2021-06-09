import { Node } from "../../../../models/project";

const IsBlockChecked = (
  isSplitView: boolean,
  node: Node,
  selectedNode: Node,
  splitViewNode: Node
): boolean => {
  if (isSplitView) {
    if (node === selectedNode) {
      return true;
    }
    if (node === splitViewNode) {
      return true;
    }
  }

  return node === selectedNode;
};

export default IsBlockChecked;
