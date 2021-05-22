import { Elements } from "react-flow-renderer";
import { CreateElementNode, CreateTreeEdge } from ".";
import { Project, EdgeType, EDGE_TYPE } from "../../../models/project";

const CreateElements = (project: Project): Elements => {
  const initialElements: Elements = [];

  if (!project) return initialElements;

  project.nodes.forEach((node) => {
    const elementNode = CreateElementNode(node, false);
    if (elementNode) initialElements.push(elementNode);
  });

  project.edges?.forEach((edge) => {
    const elementEdge = CreateTreeEdge(edge, EDGE_TYPE.DEFAULT as EdgeType);
    if (elementEdge) initialElements.push(elementEdge);
  });

  return initialElements;
};

export default CreateElements;
