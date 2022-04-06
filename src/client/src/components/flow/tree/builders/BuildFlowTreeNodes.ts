import { Node as FlowNode } from "react-flow-renderer";
import { Project } from "../../../../models";
import { IsOffPage } from "../../../../helpers/Aspects";
import { ConvertNodeToFlow } from "../../converters";

export const BuildFlowTreeNodes = (project: Project) => {
  if (!project) return [];
  const flowNodes: FlowNode[] = [];

  project.nodes.forEach((node) => {
    let treeNode = null;
    if (!IsOffPage(node)) treeNode = ConvertNodeToFlow(node);
    if (treeNode) flowNodes.push(treeNode);
  });

  return flowNodes;
};
