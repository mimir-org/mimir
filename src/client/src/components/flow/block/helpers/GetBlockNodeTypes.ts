import { BlockParentNode } from "../nodes/blockParentNode";
import { BlockNode } from "../nodes/blockNode";
import { BlockLocationNode } from "../nodes/blockLocationNode";
import { BlockOffPageNode } from "../nodes/blockOffPageNode";

const GetBlockNodeTypes = {
  BlockParentNode: BlockParentNode,
  BlockFunctionNode: BlockNode,
  BlockProductNode: BlockNode,
  BlockLocationNode: BlockLocationNode,
  BlockOffPageNode: BlockOffPageNode,
};

export default GetBlockNodeTypes;
