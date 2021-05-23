import { Project, EdgeType } from "../../../models/project";
import { CreateElementNode, CreateElementEdge } from "../helpers";
import { Elements } from "react-flow-renderer";

const CreateProjectElementNodes = (
  project: Project,
  edgeType: EdgeType
): Elements => {
  const initialElements: Elements = [];

  if (!project) return initialElements;

  project.nodes.forEach((node) => {
    const elementNode = CreateElementNode(node, false);
    if (elementNode) initialElements.push(elementNode);
  });

  if (project.edges) {
    project.edges.forEach((edge) => {
      const elementEdge = CreateElementEdge(edge, edgeType);
      if (elementEdge) initialElements.push(elementEdge);
    });
  }

  return initialElements;
};

export default CreateProjectElementNodes;
