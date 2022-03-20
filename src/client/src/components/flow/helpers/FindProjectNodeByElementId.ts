import { FlowElement } from "react-flow-renderer";
import { Project } from "../../../models";

const FindProjectNodeByElementId = (project: Project, element: FlowElement) => {
  return project.nodes.find((node) => node.id === element.id);
};

export default FindProjectNodeByElementId;
