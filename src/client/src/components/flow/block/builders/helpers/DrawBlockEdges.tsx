import { Elements } from "react-flow-renderer";
import { BuildBlockEdge } from "..";
import { Node, Edge } from "../../../../../models";
import { EdgeType, EDGE_TYPE } from "../../../../../models/project";
import { IsPartOf } from "../../../helpers";

/**
 * Component to draw all edges in BlockView.
 * @param edges
 * @param nodes
 * @param elements
 * @param secondaryNode
 * @param animatedEdge
 */
const DrawBlockEdges = (edges: Edge[], nodes: Node[], elements: Elements<any>, secondaryNode: Node, animatedEdge: boolean) => {
  edges.forEach((edge) => {
    if (!IsPartOf(edge.fromConnector)) {
      const blockEdge = BuildBlockEdge(nodes, edge, EDGE_TYPE.BLOCK as EdgeType, secondaryNode, animatedEdge);
      if (blockEdge) elements.push(blockEdge);
    }
  });
};

export default DrawBlockEdges;