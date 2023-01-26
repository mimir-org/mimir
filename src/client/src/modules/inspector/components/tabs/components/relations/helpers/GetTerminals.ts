import { Edge, Connector } from "@mimirorg/modelbuilder-types";
import { IsInputConnector, IsOutputConnector } from "../../../../../../../components/flow/helpers/Connectors";
import { InspectorElement } from "../../../../../types";
import { IsEdge, IsNode } from "../../../../../../../services";

export const GetTransports = (edges: Edge[], element: InspectorElement): Edge[] => {
  if (IsNode(element))
    return edges.filter((e) => (e.toNodeId === element.id || e.fromNodeId === element.id) && e.transport !== null);
  if (IsEdge(element)) return [element];
};

export const GetTerminals = (connectors: Connector[], edges: Edge[]): [Connector[], Connector[]] => {
  const inputTerminals = connectors.filter((c) => IsInputConnector(c) && HasEdge(edges, c));
  const outputTerminals = connectors.filter((c) => IsOutputConnector(c) && HasEdge(edges, c));

  return [inputTerminals, outputTerminals];
};

const HasEdge = (edges: Edge[], conn: Connector) =>
  edges.find((e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id);
