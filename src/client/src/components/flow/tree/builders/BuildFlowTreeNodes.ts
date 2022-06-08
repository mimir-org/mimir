import { Node as FlowNode } from "react-flow-renderer";
import { Node } from "@mimirorg/modelbuilder-types";
import { IsOffPage } from "../../../../helpers/Aspects";
import { ConvertNodeToFlow } from "../../converters";

const BuildFlowTreeNodes = (mimirNodes: Node[]) => {
  const flowNodes: FlowNode[] = [];

  mimirNodes.forEach((node) => {
    if (IsOffPage(node)) return;
    const treeNode = ConvertNodeToFlow(node);
    if (treeNode) flowNodes.push(treeNode);
  });

  return flowNodes;
};

export default BuildFlowTreeNodes;
