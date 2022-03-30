import { Edge as FlowEdge } from "react-flow-renderer";
import { BuildFlowBlockEdge } from "..";
import { Node, Project } from "../../../../../models";
import { IsPartOf } from "../../../helpers";
import { GetBlockEdgeType } from "../../helpers";

/**
 * Component to draw all edges in BlockView. PartOf edges are not displayed in BlockView.
 * @param project
 * @param flowEdges
 * @param secondaryNode
 * @param animatedEdge
 */
const DrawFlowBlockEdges = (project: Project, secondaryNode: Node, flowEdges: FlowEdge[], animatedEdge: boolean) => {
  const mimirNodes = project.nodes;
  const mimirEdges = project.edges;

  mimirEdges.forEach((edge) => {
    if (IsPartOf(edge.fromConnector)) return;

    // const sourceNodeIsDisplayed = elements.some((elem) => elem.id === edge.fromNodeId);
    // const targetNodeIsDisplayed = elements.some((elem) => elem.id === edge.toNodeId);

    // if (!sourceNodeIsDisplayed || !targetNodeIsDisplayed) return;

    const edgeType = GetBlockEdgeType(edge.fromConnector, edge.fromNode, edge.toNode);
    const blockEdge = BuildFlowBlockEdge(mimirNodes, edge, edgeType, secondaryNode, animatedEdge);

    if (blockEdge) flowEdges.push(blockEdge);
  });
};

export default DrawFlowBlockEdges;
