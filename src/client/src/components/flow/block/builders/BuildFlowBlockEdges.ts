import { Edge as FlowEdge } from "react-flow-renderer";
import { Node, Edge } from "@mimirorg/modelbuilder-types";
import { IsPartOfRelation } from "../../helpers/Connectors";
import { GetBlockEdgeType } from "../helpers";
import { BuildFlowBlockEdge } from "./BuildFlowBlockEdge";
import { VisualFilterData } from "../../../../models/application/VisualFilter";

/**
 * Component to draw all Flow edges in BlockView.
 * These elements contain the data for edges. In addition to the FlowEdges, Mimir Edges are created,
 * with the extra functionality needed for Mimir. The FlowEdges and MimirEdges co-exist
 * and share the same id and position.
 * @param mimirNodes
 * @param mimirEdges
 * @param animatedEdge
 * @returns all validated FlowEdges.
 */
const BuildFlowBlockEdges = (mimirNodes: Node[], mimirEdges: Edge[], filter: VisualFilterData) => {
  const flowEdges: FlowEdge[] = [];

  mimirEdges.forEach((edge) => {
    if (IsPartOfRelation(edge.fromConnector)) return;
    const edgeType = GetBlockEdgeType(edge.fromConnector);
    const blockEdge = BuildFlowBlockEdge(mimirNodes, edge, edgeType, filter);

    if (blockEdge) flowEdges.push(blockEdge);
  });

  return flowEdges;
};

export default BuildFlowBlockEdges;
