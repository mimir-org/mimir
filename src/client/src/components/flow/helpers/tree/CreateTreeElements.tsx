import { Elements } from "react-flow-renderer";
import { CreateTreeEdge, CreateTreeNode } from "./";
import { GetTreeEdgeType } from ".";
import { Project, Node } from "../../../../models";

const CreateTreeElements = (project: Project): Elements => {
  const initialElements: Elements = [];

  if (!project) return initialElements;

  // Create TreeNodes
  project.nodes?.forEach((node) => {
    Object.setPrototypeOf(node, Node.prototype);

    const treeNode = node?.CreateTreeNode();
    if (treeNode) initialElements.push(treeNode);
  });

  // Create TreeEdges
  project.edges?.forEach((edge) => {
    const fromConnector = edge.fromConnector;

    const edgeType = GetTreeEdgeType(fromConnector);
    const treeEdge = CreateTreeEdge(edge, edgeType);
    if (treeEdge) initialElements.push(treeEdge);
  });

  return initialElements;
};

export default CreateTreeElements;
