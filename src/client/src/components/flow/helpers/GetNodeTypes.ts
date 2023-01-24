import { BlockNode } from "../block/nodes/blockNode";
import { BlockParentNode } from "../block/nodes/blockParentNode";
import { AspectNode } from "../tree/nodes/aspectNode";
import { HandleNode } from "../tree/nodes/handleNode";
import { TreeNode } from "../tree/nodes/treeNode";

const GetNodeTypes = {
  HandleFunction: HandleNode,
  HandleProduct: HandleNode,
  HandleLocation: HandleNode,
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
