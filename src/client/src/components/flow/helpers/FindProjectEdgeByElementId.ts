import { FlowElement } from "react-flow-renderer";
import { Project } from "../../../models";

const FindProjectEdgeByElementId = (project: Project, element: FlowElement) => {
  return project.edges.find((edge) => edge.id === element.id);
};

export default FindProjectEdgeByElementId;
