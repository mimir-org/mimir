import { Elements } from "react-flow-renderer";
import { CreateTreeEdge, CreateTreeNode } from "./";
import { GetEdgeType } from "../tree/helpers";
import { Project, Edge } from "../../../models";

const CreateTreeElements = (project: Project): Elements => {
  const elements: Elements = [];

  if (!project) return elements;

  // Create TreeNodes
  project.nodes?.forEach((node) => {
    let treeNode = CreateTreeNode(node);
    if (treeNode) elements.push(treeNode);
  });

  // Create TreeEdges
  project.edges?.forEach((edge: Edge) => {
    const edgeType = GetEdgeType(edge.fromConnector);
    const treeEdge = CreateTreeEdge(edge, edgeType, project.nodes);
    if (treeEdge) elements.push(treeEdge);
  });

  return elements;
};

export default CreateTreeElements;
