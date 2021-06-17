import { Node, LibraryNodeItem } from "../../../../models";

const ValidateLibComponent = (
  libNode: LibraryNodeItem,
  selectedNode: Node,
  isBlockView: boolean,
  isSplitView: boolean
) => {
  if (!isBlockView) return true;
  return !isSplitView && selectedNode?.aspect === libNode.aspect;
};

export default ValidateLibComponent;
