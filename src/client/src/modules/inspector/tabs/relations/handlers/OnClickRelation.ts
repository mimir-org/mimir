import { Edge, Node } from "../../../../../models";
import { OnClickNode } from ".";
import { Dispatch } from "redux";

const OnClickRelation = (node: Node, edge: Edge, setActiveFlowElement: (elementId: string) => void, dispatch: Dispatch) => {
  const toNode = FindToNodeByConnector(node, edge);

  OnClickNode(toNode, setActiveFlowElement, dispatch);
};

const FindToNodeByConnector = (node: Node, edge: Edge): Node => {
  return edge.fromNode.id === node.id ? edge.toNode : edge.fromNode;
};

export { OnClickRelation };
