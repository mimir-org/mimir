import { Node, LibNode } from "../../../../models/project";
import { IsNodeSameType } from "../../../flow/helpers/common";

const ValidateLibComponent = (
  libNode: LibNode,
  selectedNode: Node,
  isBlockView: boolean,
  isSplitView: boolean
): boolean => {
  if (!isBlockView) return true;
  return (
    !isSplitView &&
    (selectedNode?.type === libNode.type ||
      IsNodeSameType(selectedNode, libNode))
  );
};

export default ValidateLibComponent;
