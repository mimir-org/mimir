import { Elements } from "react-flow-renderer";
import { BuildFlowBlockEdge } from "..";
import { Edge, Node, Project } from "../../../../../models";
import { IsPartOf } from "../../../helpers";
import { GetBlockEdgeType } from "../../helpers";

/**
 * Component to draw all edges in BlockView. PartOf edges are not displayed in BlockView.
 * @param project
 * @param elements
 * @param secondaryNode
 * @param animatedEdge
 */
const DrawFlowBlockEdges = (project: Project, secondaryNode: Node, elements: Elements<Edge>, animatedEdge: boolean) => {
  const nodes = project.nodes;
  const edges = project.edges;

  edges.forEach((edge) => {
    if (IsPartOf(edge.fromConnector)) return;

    const sourceNodeIsDisplayed = elements.some((elem) => elem.id === edge.fromNodeId);
    const targetNodeIsDisplayed = elements.some((elem) => elem.id === edge.toNodeId);

    if (!sourceNodeIsDisplayed || !targetNodeIsDisplayed) return;

    const edgeType = GetBlockEdgeType(edge.fromConnector, edge.fromNode, edge.toNode);
    const blockEdge = BuildFlowBlockEdge(nodes, edge, edgeType, secondaryNode, animatedEdge);

    if (blockEdge) elements.push(blockEdge);
  });
};

export default DrawFlowBlockEdges;
