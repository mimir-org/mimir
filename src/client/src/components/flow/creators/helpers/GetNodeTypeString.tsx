import { isFunction } from "lodash";
import { TextResources } from "../../../../assets/text";
import { Node } from "../../../../models";
import { IsLocation, IsProduct } from "../../helpers";

const GetNodeTypeString = (node: Node) => {
  if (IsLocation(node)) return TextResources.Type_BlockLocation;
  else if (IsProduct(node)) return TextResources.Type_BlockProduct;
  else if (isFunction(node)) return TextResources.Type_BlockFunction;
};

export default GetNodeTypeString;
