import { TreeNode } from "../nodes/treeNode";
import { AspectNode } from "../nodes/aspectNode";

const GetTreeNodeTypes = {
  AspectFunction: AspectNode,
  AspectLocation: AspectNode,
  AspectProduct: AspectNode,
  Function: TreeNode,
  Product: TreeNode,
  Location: TreeNode,
};

export default GetTreeNodeTypes;
