import { Project } from "../../../models";

const FindMimirNodeByFlowNodeId = (project: Project, flowNodeId: string) => {
  return project.nodes.find((node) => node.id === flowNodeId);
};

export default FindMimirNodeByFlowNodeId;
