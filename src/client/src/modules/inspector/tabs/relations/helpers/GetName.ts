import { Connector, Edge, Node } from "../../../../../models";
import { GetRelationName } from "../../../helpers";
import { GetOtherNodeFromEdgeViaConnector, GetOtherNodeFromEdgeViaNode } from "../../../../../components/flow/helpers";

const GetNameRelation = (edge: Edge, node: Node): string => {
  const name = GetRelationName(edge.fromConnector.relationType);
  const otherNode = GetOtherNodeFromEdgeViaNode(edge, node);

  return `${name}: ${otherNode.label}`;
};

const GetNameTerminal = (conn: Connector, edges: Edge[]): string => {
  const edge = edges.find((e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id);
  const otherNode = GetOtherNodeFromEdgeViaConnector(edge, conn);

  return `${conn.name}: ${otherNode?.label ?? ""}`;
};

const GetNameTransport = (edge: Edge, node: Node): string => {
  const otherNode = GetOtherNodeFromEdgeViaNode(edge, node);

  return `${edge.fromConnector.name}: ${otherNode.label}`;
};

export { GetNameRelation, GetNameTerminal, GetNameTransport };
