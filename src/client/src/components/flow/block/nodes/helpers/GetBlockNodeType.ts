import { IsFunction, IsLocation, IsProduct } from "../../../../../helpers";
import { Node } from "../../../../../models";

const GetBlockNodeType = (node: Node) => {
  if (IsFunction(node)) return "BlockFunctionNode-";
  if (IsProduct(node)) return "BlockProductNode-";
  if (IsLocation(node)) return "BlockLocationNode-";
};

export default GetBlockNodeType;
