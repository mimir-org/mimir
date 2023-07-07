import { BlockNode } from "components/flow/nodes/blockNode";
import { AspectNode, TreeNode } from "../nodes";
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
  TreekHandle: HandleNode,
};

export default GetNodeTypes;
