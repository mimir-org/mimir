import { Project, EdgeType, EDGE_TYPE } from "../../../models/project";
import { CreateElementNode, CreateElementEdge } from ".";
import { Elements } from "react-flow-renderer";

const CreateElementNodes = (project: Project): Elements => {
  const initialElements: Elements = [];

  if (!project) return initialElements;

  project.nodes.forEach((node) => {
    const elementNode = CreateElementNode(node, false);
    if (elementNode) initialElements.push(elementNode);
  });

  if (project.edges) {
    project.edges.forEach((edge) => {
      const elementEdge = CreateElementEdge(
        edge,
        EDGE_TYPE.DEFAULT as EdgeType
      );
      if (elementEdge) initialElements.push(elementEdge);
    });
  }

  return initialElements;
};

export default CreateElementNodes;
