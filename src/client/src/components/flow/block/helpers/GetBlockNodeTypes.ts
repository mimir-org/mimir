import { BlockParentNode } from "../nodes/blockParentNode";
import { BlockNode } from "../nodes/blockNode";
import { BlockLocationNode } from "../nodes/blockLocationNode";

const GetBlockNodeTypes = {
  BlockParentNode: BlockParentNode,
  BlockFunctionNode: BlockNode,
  BlockProductNode: BlockNode,
  BlockLocationNode: BlockLocationNode,
};

export default GetBlockNodeTypes;
