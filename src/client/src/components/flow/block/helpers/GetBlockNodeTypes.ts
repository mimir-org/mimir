import { BlockOffPageNode } from "../nodes/blockOffPageNode";
import { BlockNode } from "../nodes/blockNode/";
import { BlockParentNode } from "../nodes/blockParentNode";

const GetBlockNodeTypes = {
  BlockParentNode: BlockParentNode,
  BlockFunctionNode: BlockNode,
  BlockProductNode: BlockNode,
  BlockLocationNode: BlockNode,
  BlockOffPageNode: BlockOffPageNode,
};

export default GetBlockNodeTypes;
