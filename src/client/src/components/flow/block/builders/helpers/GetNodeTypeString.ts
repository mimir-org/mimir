import { TextResources } from "../../../../../assets/text/TextResources";
import { Node } from "../../../../../models";
import { IsFunction, IsLocation, IsOffPage, IsProduct } from "../../../../../helpers/Aspects";

const GetNodeTypeString = (node: Node) => {
  if (IsLocation(node)) return TextResources.BLOCK_LOCATION;
  if (IsProduct(node)) return TextResources.BLOCK_PRODUCT;
  if (IsFunction(node)) return TextResources.BLOCK_FUNCTION;
  if (IsOffPage(node)) return TextResources.BLOCK_OFFPAGE_NODE;
};

export default GetNodeTypeString;
