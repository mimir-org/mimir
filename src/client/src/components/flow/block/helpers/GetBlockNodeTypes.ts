import { AspectNode } from "../../tree/nodes/aspectNode";
import { TreeNode } from "../../tree/nodes/treeNode";
import { BlockNode } from "../nodes/blockNode/";
import { BlockParentNode } from "../nodes/blockParentNode";

const GetBlockNodeTypes = {
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

export default GetBlockNodeTypes;
