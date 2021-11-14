import { BlockParentNode } from "../nodes/blockParentNode";
import { BlockParentProductNode } from "../nodes/blockParentProductNode";
import { BlockNode } from "../nodes/blockNode";
import { BlockLocationNode } from "../nodes/blockLocationNode";
import { BlockOffPageNode } from "../nodes/blockOffPageNode";

const GetBlockNodeTypes = {
  BlockParentNode: BlockParentNode,
  BlockParentProductNode: BlockParentProductNode,
  BlockFunctionNode: BlockNode,
  BlockProductNode: BlockNode,
  BlockLocationNode: BlockLocationNode,
  BlockOffPageNode: BlockOffPageNode,
};

export default GetBlockNodeTypes;
