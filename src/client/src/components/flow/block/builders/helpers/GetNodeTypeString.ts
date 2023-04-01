import { TextResources } from "../../../../../assets/text/TextResources";
import { IsFunction, IsLocation, IsProduct } from "../../../../../helpers/Aspects";
import { AspectObject } from "lib";

const GetNodeTypeString = (node: AspectObject) => {
  if (IsLocation(node)) return TextResources.BLOCK_LOCATION;
  if (IsProduct(node)) return TextResources.BLOCK_PRODUCT;
  if (IsFunction(node)) return TextResources.BLOCK_FUNCTION;
};

export default GetNodeTypeString;
