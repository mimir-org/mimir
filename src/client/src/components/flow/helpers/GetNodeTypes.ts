import { BlockNode } from "../tree/nodes/blockNode";
import { AspectNode, TreeNode } from "../tree/nodes/";

const GetNodeTypes = {
  AspectFunction: AspectNode,
  AspectLocation: AspectNode,
  AspectProduct: AspectNode,
  BlockFunction: BlockNode,
  BlockProduct: BlockNode,
  BlockLocation: BlockNode,
  TreeFunction: TreeNode,
  TreeProduct: TreeNode,
  TreeLocation: TreeNode,
};

export default GetNodeTypes;
