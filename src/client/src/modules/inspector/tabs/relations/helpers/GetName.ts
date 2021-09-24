import { Connector, ConnectorType, Edge, Node } from "../../../../../models";
import { GetRelationName } from "../../../helpers";

const GetNameRelation = (
  conn: Connector,
  relationEdges: Map<string, Edge>
): string => {
  const name = GetRelationName(conn.relationType);

  const edge = relationEdges.get(conn.id);

  const otherNode =
    edge.fromConnector.id === conn.id ? edge.toNode : edge.fromNode;

  return `${name}: ${otherNode.label}`;
};

const GetNameTerminal = (conn: Connector): string => {
  return `${conn.name} - ${ConnectorType[conn.type]}`;
};

const GetNameTransport = (edge: Edge, node: Node): string => {
  const suffix =
    edge.fromNode.id === node.id
      ? `To ${edge.toNode.label}`
      : `From ${edge.fromNode.label}`;

  return `${edge.fromConnector.name} ${suffix}`;
};

export { GetNameRelation, GetNameTerminal, GetNameTransport };
