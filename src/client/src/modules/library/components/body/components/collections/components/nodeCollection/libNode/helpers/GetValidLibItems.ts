import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { IsFamily } from "../../../../../../../../../../helpers/Family";
import { AspectObject } from "lib";
import { LibraryState } from "../../../../../../../../../../redux/store/library/types";

const GetValidLibItems = (selectedNode: AspectObject, state: LibraryState, isBlockView: boolean) => {
  const allLibItems = [...state.libNodes];
  return allLibItems.filter((i) => IsValidLibComponent(i, selectedNode, isBlockView));
};

function IsValidLibComponent(libNode: NodeLibCm, selectedNode: AspectObject, isBlockView: boolean) {
  return isBlockView ? IsFamily(selectedNode, libNode) : true;
}

export default GetValidLibItems;
