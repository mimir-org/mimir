import { BlockParentNode } from "../../nodes/blockParentNode";
import { BlockFunctionNode } from "../../nodes/blockFunctionNode";
import { BlockLocationNode } from "../../nodes/blockLocationNode";
import { BlockProductNode } from "../../nodes/blockProductNode";
import { AspectNode } from "../../nodes/aspectNode";

const GetBlockNodeTypes = {
  AspectFunction: AspectNode,
  AspectLocation: AspectNode,
  AspectProduct: AspectNode,
  BlockFunctionNode: BlockFunctionNode,
  BlockLocationNode: BlockLocationNode,
  BlockProductNode: BlockProductNode,
  BlockParentNode: BlockParentNode,
};

export default GetBlockNodeTypes;
