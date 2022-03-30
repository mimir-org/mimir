import { Node as FlowNode } from "react-flow-renderer";
import { Project } from "../../../models";

const FindMimirNodeByFlowNodeId = (project: Project, flowNode: FlowNode) => {
  return project.nodes.find((node) => node.id === flowNode.id);
};

export default FindMimirNodeByFlowNodeId;
