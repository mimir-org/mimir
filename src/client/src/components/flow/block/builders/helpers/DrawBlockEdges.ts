import { Elements } from "react-flow-renderer";
import { BuildBlockEdge } from "..";
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
const DrawBlockEdges = (project: Project, elements: Elements<Edge>, secondaryNode: Node, animatedEdge: boolean) => {
  const nodes = project.nodes;
  const edges = project.edges;

  edges.forEach((edge) => {
    if (!IsPartOf(edge.fromConnector)) {
      const sourceNodeIsDisplayed = elements.some((x) => x.id === edge.fromNodeId);
      const targetNodeIsDisplayed = elements.some((x) => x.id === edge.toNodeId);

      if (sourceNodeIsDisplayed && targetNodeIsDisplayed) {
        const edgeType = GetBlockEdgeType(edge.fromConnector, edge.fromNode, edge.toNode);
        const blockEdge = BuildBlockEdge(nodes, edge, edgeType, secondaryNode, animatedEdge);
        if (blockEdge) elements.push(blockEdge);
      }
    }
  });
};

export default DrawBlockEdges;
