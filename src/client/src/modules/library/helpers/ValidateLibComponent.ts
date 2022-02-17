import { IsFamily } from "../../../helpers";
import { Node, LibItem } from "../../../models";

export const ValidateLibComponent = (libNode: LibItem, selectedNode: Node, isBlockView: boolean) => {
  if (!isBlockView) return true;
  return IsFamily(selectedNode, libNode);
};
