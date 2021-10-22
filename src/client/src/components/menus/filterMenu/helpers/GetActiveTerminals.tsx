import { Connector, Node, EDGE_KIND } from "../../../../models";
import { EDGE_TYPE } from "../../../../models/project";

const GetActiveTerminals = (elements: any[], nodes: Node[]) => {
  const terminals: Connector[] = [];
  const edgeTypes = Object.values(EDGE_TYPE);

  elements?.forEach((elem) => {
    const isEdge = edgeTypes.some((x) => x === elem.type?.toString() || elem.kind === EDGE_KIND);

    if (isEdge) {
      const sourceConnId = elem?.data.edge.fromConnectorId;
      const targetConnId = elem?.data.edge.toConnectorId;
      const sourceNodeId = elem?.data.edge.fromNodeId;
      const targetNodeId = elem?.data.edge.toNodeId;
      const sourceNode = nodes.find((n) => n.id === sourceNodeId);
      const targetNode = nodes.find((n) => n.id === targetNodeId);
      const sourceConn = sourceNode.connectors.find((c) => c.id === sourceConnId);
      const targetConn = targetNode.connectors.find((c) => c.id === targetConnId);
      terminals.push(sourceConn);
      terminals.push(targetConn);
    }
  });

  return terminals;
};

export default GetActiveTerminals;
