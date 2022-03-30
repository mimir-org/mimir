import { Edge as FlowEdge } from "react-flow-renderer";
import { Project } from "../../../models";

const FindMimirEdgeByFlowEdgeId = (project: Project, flowEdge: FlowEdge) => {
  return project.edges.find((edge) => edge.id === flowEdge.id);
};

export default FindMimirEdgeByFlowEdgeId;
