import { Edge, Node } from "../../../../../../../models";

export const OnClickRelation = (node: Node, edge: Edge, setSelectedNodes: (nodeIds: string[]) => void) => {
  const toNode = edge.fromNode.id === node.id ? edge.toNode : edge.fromNode;
  const selectedFlowNodeIds = [];
  selectedFlowNodeIds.push(toNode?.id);

  setSelectedNodes(selectedFlowNodeIds);
};

export const OnClickTransport = (edge: Edge, setSelectedEdges: (edgeIds: string[]) => void) => {
  const selectedFlowEdgeIds = [];
  selectedFlowEdgeIds.push(edge.id);

  setSelectedEdges(selectedFlowEdgeIds);
};

export const OnClickNode = (node: Node, setSelectedNodes: (nodeIds: string[]) => void) => {
  const selectedFlowNodeIds = [];
  selectedFlowNodeIds.push(node?.id);

  setSelectedNodes(selectedFlowNodeIds);
};

export const OnClickTerminal = () => {
  //TODO: Implement handler when Terminals can be selected for the inspector.
};
