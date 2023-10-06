import { BlockLibCm } from "@mimirorg/typelibrary-types";
import { IsFamily } from "../../../../../../../../../../helpers/Family";
import { AspectObject } from "lib";

const GetValidLibItems = (selectedNode: AspectObject, aspectObjects: BlockLibCm[], isBlockView: boolean) => {
  return aspectObjects.filter((i) => IsValidLibComponent(i, selectedNode, isBlockView));
};

function IsValidLibComponent(libNode: BlockLibCm, selectedNode: AspectObject, isBlockView: boolean) {
  return isBlockView ? IsFamily(selectedNode, libNode) : true;
}

export default GetValidLibItems;
