import { TextResources } from "../../../../../assets/text";
import { Node } from "../../../../../models";
import { IsLocation, IsProduct, IsFunction, IsOffPage } from "../../../../../helpers";

const GetNodeTypeString = (node: Node) => {
  if (IsLocation(node)) return TextResources.Type_BlockLocation;
  if (IsProduct(node)) return TextResources.Type_BlockProduct;
  if (IsFunction(node)) return TextResources.Type_BlockFunction;
  if (IsOffPage(node)) return TextResources.Type_OffPageNode;
};

export default GetNodeTypeString;
