import { Node as FlowNode } from "react-flow-renderer";
import { Node } from "@mimirorg/modelbuilder-types";
import { ConvertNodeToFlowNode } from "../../converters";

const BuildFlowTreeNodes = (mimirNodes: Node[]) => {
  const flowNodes: FlowNode[] = [];

  mimirNodes.forEach((node) => {
    const treeNode = ConvertNodeToFlowNode(node);
    if (treeNode) flowNodes.push(treeNode);
  });

  return flowNodes;
};

export default BuildFlowTreeNodes;
