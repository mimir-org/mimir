import { Edge, Node } from "../../../../../models";
import { OnClickNode } from ".";

const OnClickRelation = (node: Node, edge: Edge, setActiveFlowElement: (elementId: string) => void) => {
  const toNode = FindToNodeByConnector(node, edge);

  OnClickNode(toNode, setActiveFlowElement);
};

const FindToNodeByConnector = (node: Node, edge: Edge): Node => {
  return edge.fromNode.id === node.id ? edge.toNode : edge.fromNode;
};

export { OnClickRelation };
