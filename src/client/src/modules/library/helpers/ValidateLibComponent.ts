import { IsFamily } from "../../../helpers";
import { LibItem, Node } from "../../../models";

const ValidateLibComponent = (libNode: LibItem, selectedNode: Node, isBlockView: boolean) => {
  if (!isBlockView) return true;
  return IsFamily(selectedNode, libNode);
};

export default ValidateLibComponent;
