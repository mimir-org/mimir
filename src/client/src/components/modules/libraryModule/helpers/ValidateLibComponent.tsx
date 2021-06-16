import { Node, LibraryNodeItem } from "../../../../models/project";
import { IsNodeSameType } from "../../../flow/helpers/common";

const ValidateLibComponent = (
  libNode: LibraryNodeItem,
  selectedNode: Node,
  isBlockView: boolean,
  isSplitView: boolean
): boolean => {
  if (!isBlockView) return true;
  return (
    !isSplitView &&
    (selectedNode?.aspect === libNode.aspect ||
      IsNodeSameType(selectedNode, libNode))
  );
};

export default ValidateLibComponent;
