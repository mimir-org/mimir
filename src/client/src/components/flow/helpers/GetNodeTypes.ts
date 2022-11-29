import { BlockNode } from "../block/nodes/blockNode";
import { BlockParentNode } from "../block/nodes/blockParentNode";
import { AspectNode } from "../tree/nodes/aspectNode";
import { TreeNode } from "../tree/nodes/treeNode";

const GetNodeTypes = {
  AspectFunction: AspectNode,
  AspectLocation: AspectNode,
  AspectProduct: AspectNode,
  BlockParentNode: BlockParentNode,
  BlockFunctionNode: BlockNode,
  BlockProductNode: BlockNode,
  BlockLocationNode: BlockNode,
  Function: TreeNode,
  Product: TreeNode,
  Location: TreeNode,
};

export default GetNodeTypes;
