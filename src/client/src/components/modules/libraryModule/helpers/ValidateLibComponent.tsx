import { Node, LibNode } from "../../../../models/project";
import { IsAspectSameType } from "../../../flow/helpers";

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
      IsAspectSameType(selectedNode, libNode))
  );
};

export default ValidateLibComponent;
