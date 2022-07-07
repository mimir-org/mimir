import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { IsFamily } from "../../../../../../../../../../helpers/Family";
import { Node } from "@mimirorg/modelbuilder-types";
import { LibraryState } from "../../../../../../../../../../redux/store/library/types";

const GetValidLibItems = (selectedNode: Node, state: LibraryState, isBlockView: boolean) => {
  const allLibItems = [...state.libNodes];
  return allLibItems.filter((i) => IsValidLibComponent(i, selectedNode, isBlockView));
};

function IsValidLibComponent(libNode: NodeLibCm, selectedNode: Node, isBlockView: boolean) {
  return isBlockView ? IsFamily(selectedNode, libNode) : true;
}

export default GetValidLibItems;