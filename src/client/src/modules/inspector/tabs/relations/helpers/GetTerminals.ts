import { Connector, Edge, Node } from "../../../../../models";
import {
  IsInputTerminal,
  IsOutputTerminal,
  IsTransportTerminal,
} from "../../../../../components/flow/helpers/common";

const GetTerminalsAndTransports = (
  connectors: Connector[],
  edges: Edge[],
  node: Node
): [Connector[], Connector[], Edge[]] => {
  const transports = edges.filter(
    (e) =>
      (e.toNodeId === node.id || e.fromNodeId === node.id) && IsTransportTerminal(e.fromConnector)
  );

  const inputTerminals = connectors.filter(
    (x) => x.terminalTypeId && IsInputTerminal(x) && HasEdge(transports, x)
  );

  const outputTerminals = connectors.filter(
    (x) => x.terminalTypeId && IsOutputTerminal(x) && HasEdge(transports, x)
  );

  return [inputTerminals, outputTerminals, transports];
};

const HasEdge = (edges: Edge[], conn: Connector) =>
  edges.find((e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id);

export default GetTerminalsAndTransports;
