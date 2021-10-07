import { BlockParentNode } from "../../nodes/blockParentNode";
import { BlockNode } from "../../nodes/blockNode";
import { BlockLocationNode } from "../../nodes/blockLocationNode";
import { AspectNode } from "../../nodes/aspectNode";

const GetBlockNodeTypes = {
  AspectFunction: AspectNode,
  AspectLocation: AspectNode,
  AspectProduct: AspectNode,
  BlockParentNode: BlockParentNode,
  BlockFunctionNode: BlockNode,
  BlockProductNode: BlockNode,
  BlockLocationNode: BlockLocationNode,
};

export default GetBlockNodeTypes;
