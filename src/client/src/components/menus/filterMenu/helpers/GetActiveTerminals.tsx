import { Connector, EDGE_KIND } from "../../../../models";
import { EDGE_TYPE } from "../../../../models/project";

const GetActiveTerminals = (elements: any[], nodes: any[]) => {
  const terminals: Connector[] = [];
  const edgeTypes = Object.values(EDGE_TYPE);

  elements?.forEach((elem) => {
    const isEdge = edgeTypes.some((x) => x === elem.type?.toString() || elem.kind === EDGE_KIND);

    if (isEdge) {
      const sourceConnId = elem?.data.edge.fromConnectorId;
      const targetConnId = elem?.data.edge.toConnectorId;
      const sourceNodeId = elem?.data.edge.fromNodeId;
      const targetNodeId = elem?.data.edge.toNodeId;
      const sourceNode = nodes.find((n) => n.data.id === sourceNodeId);
      const targetNode = nodes.find((n) => n.data.id === targetNodeId);
      const sourceConn = sourceNode.data.connectors?.find((c: Connector) => c.id === sourceConnId) as Connector;
      const targetConn = targetNode.data.connectors?.find((c: Connector) => c.id === targetConnId) as Connector;

      if (sourceConn) terminals.push(sourceConn);
      if (targetConn) terminals.push(targetConn);
    }
  });
  return terminals;
};

export default GetActiveTerminals;
