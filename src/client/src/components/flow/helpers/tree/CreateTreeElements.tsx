import { Elements } from "react-flow-renderer";
import { CreateTreeEdge, CreateTreeNode } from "./";
import { EdgeType, EDGE_TYPE, Project } from "../../../../models/project";

const CreateTreeElements = (project: Project): Elements => {
  const initialElements: Elements = [];

  if (!project) return initialElements;

  project.nodes.forEach((node) => {
    const treeNode = CreateTreeNode(node);
    if (treeNode) initialElements.push(treeNode);
  });

  project.edges?.forEach((edge) => {
    const treeEdge = CreateTreeEdge(edge, EDGE_TYPE.DEFAULT as EdgeType);
    if (treeEdge) initialElements.push(treeEdge);
  });

  return initialElements;
};

export default CreateTreeElements;
