import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { IsFamily } from "../../../../../../../../../helpers/Family";
import { Node } from "../../../../../../../../../models";
import { LibraryState } from "../../../../../../../../../redux/store/library/types";

const IsValidLibComponent = (libNode: NodeLibCm, selectedNode: Node, isBlockView: boolean) => {
  return isBlockView ? IsFamily(selectedNode, libNode) : true;
};

export const GetValidLibItems = (selectedNode: Node, state: LibraryState, isBlockView: boolean) => {
  const allLibItems = [...state.nodeTypes];
  return allLibItems.filter((i) => IsValidLibComponent(i, selectedNode, isBlockView));
};
