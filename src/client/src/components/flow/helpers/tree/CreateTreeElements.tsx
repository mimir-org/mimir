import { Elements } from "react-flow-renderer";
import { CreateTreeEdge, CreateTreeNode } from "./";
import { EdgeType, Project } from "../../../../models/project";

const CreateTreeElements = (project: Project, edgeType: EdgeType): Elements => {
  const initialElements: Elements = [];

  if (!project) return initialElements;

  project.nodes.forEach((node) => {
    const treeNode = CreateTreeNode(node);
    if (treeNode) initialElements.push(treeNode);
  });

  project.edges?.forEach((edge) => {
    const treeEdge = CreateTreeEdge(edge, edgeType);
    if (treeEdge) initialElements.push(treeEdge);
  });

  return initialElements;
};

export default CreateTreeElements;
