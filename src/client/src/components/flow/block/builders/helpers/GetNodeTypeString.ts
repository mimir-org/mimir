import { TextResources } from "../../../../../assets/text/TextResources";
import { Node, NodeType } from "@mimirorg/modelbuilder-types";
import { IsFunction, IsLocation, IsProduct } from "../../../../../helpers/Aspects";

const GetNodeTypeString = (node: Node) => {
  if (IsLocation(node) && node.nodeType === NodeType.Handler) return "Handle" + TextResources.BLOCK_LOCATION;
  if (IsProduct(node) && node.nodeType === NodeType.Handler) return "Handle" + TextResources.BLOCK_PRODUCT;
  if (IsFunction(node) && node.nodeType === NodeType.Handler) return "Handle" + TextResources.BLOCK_FUNCTION;
  if (IsLocation(node)) return TextResources.BLOCK_LOCATION;
  if (IsProduct(node)) return TextResources.BLOCK_PRODUCT;
  if (IsFunction(node)) return TextResources.BLOCK_FUNCTION;
};

export default GetNodeTypeString;
