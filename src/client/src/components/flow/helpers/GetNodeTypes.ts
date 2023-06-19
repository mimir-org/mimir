import { BlockNode } from "../block/nodes/blockNode";
import { BlockParentNode } from "../block/nodes/blockParentNode";
import { AspectNode, TreeNode } from "../tree/nodes/";

const GetNodeTypes = {
  AspectFunction: AspectNode,
  AspectLocation: AspectNode,
  AspectProduct: AspectNode,
  BlockParent: BlockParentNode,
  BlockFunction: BlockNode,
  BlockProduct: BlockNode,
  BlockLocation: BlockNode,
  TreeFunction: TreeNode,
  TreeProduct: TreeNode,
  TreeLocation: TreeNode,
};

export default GetNodeTypes;
