import { BlockFunctionParentNode } from "../../nodes/blockFunctionParentNode";
import { BlockLocationParentNode } from "../../nodes/blockLocationParentNode";
import { BlockFunctionNode } from "../../nodes/blockFunctionNode";
import { BlockLocationNode } from "../../nodes/blockLocationNode";
import { AspectNode } from "../../nodes/aspectNode";

const GetBlockNodeTypes = {
  AspectFunction: AspectNode,
  AspectLocation: AspectNode,
  AspectProduct: AspectNode,
  BlockFunctionNode: BlockFunctionNode,
  BlockLocationNode: BlockLocationNode,
  BlockFunctionParentNode: BlockFunctionParentNode,
  BlockLocationParentNode: BlockLocationParentNode,
};

export default GetBlockNodeTypes;
