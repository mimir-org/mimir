import { Node, Edge } from "../../../../models";
import { IsTransportTerminal } from "../../../flow/helpers";

const GetActiveTerminals = (nodes: Node[], edges: Edge[]) => {
  const terminals = [];

  edges.forEach((e) => {
    const fromConn = e.fromConnector;
    const toConn = e.toConnector;
    if (IsTransportTerminal(fromConn) && IsTransportTerminal(toConn)) {
      const sourceNode = nodes.find((n) => n.id === fromConn.nodeId);
      const targetNode = nodes.find((n) => n.id === toConn.nodeId);
      const sourceTerminal = sourceNode.connectors.find((c) => c.id === fromConn.id);
      const targetTerminal = targetNode.connectors.find((c) => c.id === toConn.id);
      if (sourceTerminal) terminals.push(sourceTerminal);
      if (targetTerminal) terminals.push(targetTerminal);
    }
  });

  return terminals;
};

export default GetActiveTerminals;
