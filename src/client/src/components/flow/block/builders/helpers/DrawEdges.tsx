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
 */
const DrawEdges = (edges: Edge[], nodes: Node[], elements: Elements<any>, secondaryNode: Node) => {
  edges.forEach((edge) => {
    if (!IsPartOf(edge.fromConnector)) {
      const blockEdge = BuildBlockEdge(nodes, edge, EDGE_TYPE.BLOCK as EdgeType, secondaryNode);
      if (blockEdge) elements.push(blockEdge);
    }
  });
};

export default DrawEdges;
