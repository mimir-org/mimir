import { Node, LibNode } from "../../../../models/project";

const ValidateLibComponent = (
  libNode: LibNode,
  selectedNode: Node,
  isBlockView: boolean,
  isSplitView: boolean
): boolean => {
  if (!isBlockView) return true;
  return libNode.type === selectedNode?.type && !isSplitView;
};

export default ValidateLibComponent;
