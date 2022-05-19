import { IsFamily } from "../../../../../../../../../helpers/Family";
import { LibItem, Node } from "../../../../../../../../../models";
import { LibraryState } from "../../../../../../../../../redux/store/library/types";

const isValidLibComponent = (libNode: LibItem, selectedNode: Node, isBlockView: boolean) => {
  if (!isBlockView) return true;
  return IsFamily(selectedNode, libNode);
};

export const getValidLibItems = (selectedNode: Node, state: LibraryState, isBlockView: boolean) => {
  const allLibItems: LibItem[] = [...state.nodeTypes, ...state.interfaceTypes, ...state.transportTypes];
  return allLibItems.filter((i) => isValidLibComponent(i, selectedNode, isBlockView));
};
