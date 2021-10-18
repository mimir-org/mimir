import { Edge, Node } from "../../../../../models";
import { OnClickNode } from ".";

const OnClickRelation = (node: Node, edge: Edge, dispatch: any) => {
  const toNode = FindToNodeByConnector(node, edge);

  OnClickNode(toNode, dispatch);
};

const FindToNodeByConnector = (node: Node, edge: Edge): Node => {
  return edge.fromNode.id === node.id ? edge.toNode : edge.fromNode;
};

export { OnClickRelation };
