import { TreeviewNode } from "../../nodes/treeViewNode";
import { AspectNode } from "../../nodes/aspectNode";

const GetNodeTypes = {
  AspectFunction: AspectNode,
  AspectLocation: AspectNode,
  AspectProduct: AspectNode,
  Function: TreeviewNode,
  Product: TreeviewNode,
  Location: TreeviewNode,
};

export default GetNodeTypes;
