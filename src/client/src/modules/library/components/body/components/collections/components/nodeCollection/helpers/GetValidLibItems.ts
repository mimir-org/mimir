import { IsFamily } from "../../../../../../../../../helpers/Family";
import { LibItem, Node } from "../../../../../../../../../models";
import { LibraryState } from "../../../../../../../../../redux/store/library/types";

const IsValidLibComponent = (libNode: LibItem, selectedNode: Node, isBlockView: boolean) => {
  return isBlockView ? IsFamily(selectedNode, libNode) : true;
};

export const GetValidLibItems = (selectedNode: Node, state: LibraryState, isBlockView: boolean) => {
  const allLibItems = [...state.nodeTypes, ...state.interfaceTypes, ...state.transportTypes];
  return allLibItems.filter((i) => IsValidLibComponent(i, selectedNode, isBlockView));
};
