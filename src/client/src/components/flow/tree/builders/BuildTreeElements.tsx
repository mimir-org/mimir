import { Elements } from "react-flow-renderer";
import { BuildTreeEdge, BuildTreeNode } from ".";
import { GetEdgeType } from "../helpers";
import { Project, Edge } from "../../../../models";

const BuildTreeElements = (project: Project): Elements => {
  const elements: Elements = [];

  if (!project) return elements;

  project.nodes?.forEach((node) => {
    const treeNode = BuildTreeNode(node);
    if (treeNode) elements.push(treeNode);
  });

  project.edges?.forEach((edge: Edge) => {
    const edgeType = GetEdgeType(edge.fromConnector);
    const treeEdge = BuildTreeEdge(edge, edgeType, project.nodes);
    if (treeEdge) elements.push(treeEdge);
  });

  return elements;
};

export default BuildTreeElements;
