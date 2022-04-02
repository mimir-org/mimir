import { Project } from "../../../models";

const FindMimirEdgeByFlowEdgeId = (project: Project, flowEdgeId: string) => {
  return project.edges.find((edge) => edge.id === flowEdgeId);
};

export default FindMimirEdgeByFlowEdgeId;
