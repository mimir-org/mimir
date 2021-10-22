import { Edge, Node, EDGE_KIND } from "../../../../models";
import { EDGE_TYPE } from "../../../../models/project";

/**
 * Method to find a node's active terminals - terminals that have an edge
 * @param elements
 * @param nodes
 * @returns a list of active terminals and edges
 */
const GetActiveTerminals = (elements: any[], nodes: Node[]) => {
  const activeElements: any[] = [];
  const edgeTypes = Object.values(EDGE_TYPE);

  elements?.forEach((elem) => {
    const isEdge = edgeTypes.some((x) => x === elem.type?.toString() || elem.kind === EDGE_KIND);

    if (isEdge) {
      const edge = elem.data.edge as Edge;

      const sourceNode = nodes.find((n) => n.id === edge.fromNodeId);
      const targetNode = nodes.find((n) => n.id === edge.toNodeId);
      const sourceConn = sourceNode.connectors.find((c) => c.id === edge.fromConnectorId);
      const targetConn = targetNode.connectors.find((c) => c.id === edge.toConnectorId);

      activeElements.push(edge);
      activeElements.push(sourceConn);
      activeElements.push(targetConn);
    }
  });
  return activeElements;
};

export default GetActiveTerminals;
