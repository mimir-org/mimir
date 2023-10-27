import { BlockLibCm } from "@mimirorg/typelibrary-types";
import { IsFamily } from "../../../../../../../../../../helpers/Family";
import { Block } from "lib";

const GetValidLibItems = (selectedNode: Block, aspectObjects: BlockLibCm[], isBlockView: boolean) => {
  return aspectObjects.filter((i) => IsValidLibComponent(i, selectedNode, isBlockView));
};

function IsValidLibComponent(libNode: BlockLibCm, selectedNode: Block, isBlockView: boolean) {
  return isBlockView ? IsFamily(selectedNode, libNode) : true;
}

export default GetValidLibItems;
