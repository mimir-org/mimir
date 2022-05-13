import { Connector, Edge } from "../../../../../../../models";
import { IsInputTerminal, IsOutputTerminal } from "../../../../../../../components/flow/helpers/Connectors";
import { InspectorElement } from "../../../../../types";
import { IsEdge, IsNode } from "../../../../../helpers/IsType";

export const GetTransports = (edges: Edge[], element: InspectorElement): Edge[] => {
  if (IsNode(element))
    return edges.filter((e) => (e.toNodeId === element.id || e.fromNodeId === element.id) && e.transport !== null);
  if (IsEdge(element)) return [element];
};

export const GetTerminals = (connectors: Connector[], edges: Edge[]): [Connector[], Connector[]] => {
  const inputTerminals = connectors.filter((x) => x.terminalTypeId && IsInputTerminal(x) && HasEdge(edges, x));
  const outputTerminals = connectors.filter((x) => x.terminalTypeId && IsOutputTerminal(x) && HasEdge(edges, x));

  return [inputTerminals, outputTerminals];
};

const HasEdge = (edges: Edge[], conn: Connector) =>
  edges.find((e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id);
