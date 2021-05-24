import { Elements } from "react-flow-renderer";
import { CreateTreeEdge, CreateTreeNode } from "./";
import { NODE_TYPE, Project } from "../../../../models/project";
import { GetTreeEdgeType } from ".";

const CreateTreeElements = (project: Project): Elements => {
  const initialElements: Elements = [];

  if (!project) return initialElements;

  project.nodes.forEach((node) => {
    let treeNode = null;
    if (node.type !== NODE_TYPE.OFF_PAGE) treeNode = CreateTreeNode(node);
    if (treeNode) initialElements.push(treeNode);
  });

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
