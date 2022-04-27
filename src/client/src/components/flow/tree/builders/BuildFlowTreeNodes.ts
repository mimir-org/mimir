import { Node as FlowNode } from "react-flow-renderer";
import { Node } from "../../../../models";
import { IsOffPage } from "../../../../helpers/Aspects";
import { ConvertNodeToFlow } from "../../converters";

const BuildFlowTreeNodes = (nodes: Node[]) => {
  if (!nodes.length) return [];
  const flowNodes: FlowNode[] = [];

  nodes.forEach((node) => {
    if (IsOffPage(node)) return;
    const treeNode = ConvertNodeToFlow(node);
    if (treeNode) flowNodes.push(treeNode);
  });

  return flowNodes;
};

export default BuildFlowTreeNodes;
