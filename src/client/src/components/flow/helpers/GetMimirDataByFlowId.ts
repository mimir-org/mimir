import { Project } from "../../../models";

export const GetMimirNodeByFlowNodeId = (project: Project, flowNodeId: string) => {
  return project.nodes.find((node) => node.id === flowNodeId);
};

export const GetMimirEdgeByFlowEdgeId = (project: Project, flowEdgeId: string) => {
  return project.edges.find((edge) => edge.id === flowEdgeId);
};
