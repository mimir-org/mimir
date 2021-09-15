import { Aspect, FunctionBlock } from "../../nodes";
import { BlockFunctionNode } from "../../nodes/blockFunctionNode";
import { BlockLocationNode } from "../../nodes/blockLocationNode";

const GetBlockNodeTypes = {
  AspectFunction: Aspect,
  AspectLocation: Aspect,
  AspectProduct: Aspect,
  BlockFunctionNode: BlockFunctionNode,
  BlockLocationNode: BlockLocationNode,
  FunctionBlock: FunctionBlock,
};

export default GetBlockNodeTypes;
