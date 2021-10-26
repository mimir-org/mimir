import { IsFamily } from "../../../components/flow/helpers";
import { Node, LibItem } from "../../../models";

const ValidateLibComponent = (libNode: LibItem, selectedNode: Node, isBlockView: boolean) => {
  if (!isBlockView) return true;
  return IsFamily(selectedNode, libNode);
};

export default ValidateLibComponent;
