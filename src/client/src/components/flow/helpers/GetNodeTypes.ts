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
  HandleBlockFunctionNode: HandleNode,
  HandleBlockProductNode: HandleNode,
  HandleBlockLocationNode: HandleNode,
  Function: TreeNode,
  Product: TreeNode,
  Location: TreeNode,
};

export default GetNodeTypes;
