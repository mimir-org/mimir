import { TextResources } from "../../../../../assets/text/TextResources";
import { Node } from "@mimirorg/modelbuilder-types";
import { IsFunction, IsLocation, IsProduct } from "../../../../../helpers/Aspects";

const GetNodeTypeString = (node: Node) => {
  if (IsLocation(node)) return TextResources.BLOCK_LOCATION;
  if (IsProduct(node)) return TextResources.BLOCK_PRODUCT;
  if (IsFunction(node)) return TextResources.BLOCK_FUNCTION;
};

export default GetNodeTypeString;
