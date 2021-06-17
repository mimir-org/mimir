import { Elements } from "react-flow-renderer";
import { CreateTreeEdge, CreateTreeNode } from "./";
import { NODE_TYPE } from "../../../../models/project";
import { GetTreeEdgeType } from ".";
import { Project } from "../../../../models";

const CreateTreeElements = (project: Project): Elements => {
  const initialElements: Elements = [];

  if (!project) return initialElements;

  // Create TreeNodes
  project.nodes?.forEach((node) => {
    let treeNode = null;
    if (node.type !== NODE_TYPE.OFF_PAGE) treeNode = CreateTreeNode(node);
    if (treeNode) initialElements.push(treeNode);
  });

  // Create TreeEdges
  project.edges?.forEach((edge) => {
    if (edge.targetType === NODE_TYPE.OFF_PAGE) return;
    const fromNode = project.nodes.find((x) => x.id === edge.fromNode);
    const fromConnector = fromNode?.connectors.find(
      (x) => x.id === edge.fromConnector
    );

    const edgeType = GetTreeEdgeType(fromConnector);
    const treeEdge = CreateTreeEdge(edge, edgeType);
    if (treeEdge) initialElements.push(treeEdge);
  });

  return initialElements;
};

export default CreateTreeElements;
