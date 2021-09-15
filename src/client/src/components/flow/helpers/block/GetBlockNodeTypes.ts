import { FunctionBlock } from "../../nodes";
import { BlockFunctionNode } from "../../nodes/blockFunctionNode";
import { BlockLocationNode } from "../../nodes/blockLocationNode";
import { AspectNode } from "../../nodes/aspectNode";

const GetBlockNodeTypes = {
  AspectFunction: AspectNode,
  AspectLocation: AspectNode,
  AspectProduct: AspectNode,
  BlockFunctionNode: BlockFunctionNode,
  BlockLocationNode: BlockLocationNode,
  FunctionBlock: FunctionBlock,
};

export default GetBlockNodeTypes;
