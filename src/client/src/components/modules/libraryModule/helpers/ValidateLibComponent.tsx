import { Node, LibItem } from "../../../../models";

const ValidateLibComponent = (
  libNode: LibItem,
  selectedNode: Node,
  isBlockView: boolean,
  isSplitView: boolean
) => {
  if (!isBlockView) return true;
  return !isSplitView && selectedNode?.aspect === libNode.aspect;
};

export default ValidateLibComponent;
