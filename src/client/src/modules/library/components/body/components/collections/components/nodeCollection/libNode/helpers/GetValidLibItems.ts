import { AspectObjectLibCm } from "@mimirorg/typelibrary-types";
import { IsFamily } from "../../../../../../../../../../helpers/Family";
import { AspectObject } from "lib";

const GetValidLibItems = (selectedNode: AspectObject, aspectObjects: AspectObjectLibCm[], isBlockView: boolean) => {
  return aspectObjects.filter((i) => IsValidLibComponent(i, selectedNode, isBlockView));
};

function IsValidLibComponent(libNode: AspectObjectLibCm, selectedNode: AspectObject, isBlockView: boolean) {
  return isBlockView ? IsFamily(selectedNode, libNode) : true;
}

export default GetValidLibItems;
