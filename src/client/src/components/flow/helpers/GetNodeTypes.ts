import { BlockNode } from "components/flow/nodes/blockNode";
import { AspectNode, ParentNode, TreeNode } from "../nodes";
import HandleNode from "../nodes/handleNode/HandleNode";

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
  BlockHandle: HandleNode,
  TreeHandle: HandleNode,
  ParentNode: ParentNode,
};

export default GetNodeTypes;
