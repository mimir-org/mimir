import { Connector, Edge, Node } from "../../../models";

function GetOtherNodeFromEdgeViaConnector(edge: Edge, conn: Connector) {
  return edge?.fromConnector.id === conn.id ? edge.toNode : edge?.fromNode;
}

function GetOtherNodeFromEdgeViaNode(edge: Edge, node: Node) {
  return edge?.fromNode.id === node.id ? edge.toNode : edge?.fromNode;
}

export { GetOtherNodeFromEdgeViaConnector, GetOtherNodeFromEdgeViaNode };
