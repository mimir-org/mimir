import { TextResources } from "../../../../../assets/text";
import { Node } from "../../../../../models";
import { IsLocation, IsProduct, IsFunction } from "../../../helpers";

const GetNodeTypeString = (node: Node) => {
  if (IsLocation(node)) return TextResources.Type_BlockLocation;
  else if (IsProduct(node)) return TextResources.Type_BlockProduct;
  else if (IsFunction(node)) return TextResources.Type_BlockFunction;
};

export default GetNodeTypeString;
