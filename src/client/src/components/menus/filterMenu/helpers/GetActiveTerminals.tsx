import { Edge, Node, EDGE_KIND } from "../../../../models";
import { EDGE_TYPE } from "../../../../models/project";

const GetActiveTerminals = (elements: any[], nodes: any[]) => {
  const activeElements: any[] = [];
  const edgeTypes = Object.values(EDGE_TYPE);

  elements?.forEach((elem) => {
    const isEdge = edgeTypes.some((x) => x === elem.type?.toString() || elem.kind === EDGE_KIND);

    if (isEdge) {
      const edge = elem.data.edge as Edge;

      const sourceConnId = edge.fromConnectorId;
      const targetConnId = edge.toConnectorId;
      const sourceNodeId = edge.fromNodeId;
      const targetNodeId = edge.toNodeId;

      const sourceNode = nodes.find((n) => n.data.id === sourceNodeId).data as Node;
      const targetNode = nodes.find((n) => n.data.id === targetNodeId).data as Node;

      const sourceConn = sourceNode.connectors?.find((c) => c.id === sourceConnId);
      const targetConn = targetNode.connectors?.find((c) => c.id === targetConnId);

      activeElements.push(edge);
      activeElements.push(sourceConn);
      activeElements.push(targetConn);
    }
  });
  return activeElements;
};

export default GetActiveTerminals;
