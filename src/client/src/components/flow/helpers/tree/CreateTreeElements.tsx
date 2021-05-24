import { Elements } from "react-flow-renderer";
import { CreateTreeEdge, CreateTreeNode } from "./";
import { Project } from "../../../../models/project";
import { GetTreeEdgeType } from ".";

const CreateTreeElements = (project: Project): Elements => {
  const initialElements: Elements = [];

  if (!project) return initialElements;

  project.nodes.forEach((node) => {
    const treeNode = CreateTreeNode(node);
    if (treeNode) initialElements.push(treeNode);
  });

  project.edges?.forEach((edge) => {
    const fromNode = project.nodes.find((x) => x.id === edge.fromNode);
    const fromConnector = fromNode.connectors.find(
      (x) => x.id === edge.fromConnector
    );

    const edgeType = GetTreeEdgeType(fromConnector);
    const treeEdge = CreateTreeEdge(edge, edgeType);
    if (treeEdge) initialElements.push(treeEdge);
  });

  return initialElements;
};

export default CreateTreeElements;
