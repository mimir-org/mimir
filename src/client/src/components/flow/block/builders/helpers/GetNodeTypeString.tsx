import { TextResources } from "../../../../../assets/text";
import { Node } from "../../../../../models";
import { IsLocation, IsProduct, IsFunction } from "../../../helpers";

const GetNodeTypeString = (node: Node) => {
  if (IsLocation(node)) return TextResources.Type_BlockLocation;
  if (IsProduct(node)) return TextResources.Type_BlockProduct;
  if (IsFunction(node)) return TextResources.Type_BlockFunction;
};

export default GetNodeTypeString;
