import { Block, Connection } from "lib";

export const OnClickRelation = (node: Block, edge: Connection, setSelectedNodes: (nodeIds: string[]) => void) => {
  // const toNode = edge.fromNode.id === node.id ? edge.toNode : edge.fromNode;
  // const selectedFlowNodeIds = [];
  // selectedFlowNodeIds.push(toNode?.id);
  // setSelectedNodes(selectedFlowNodeIds);
};

export const OnClickTransport = (edge: Connection, setSelectedEdges: (edgeIds: string[]) => void) => {
  const selectedFlowEdgeIds = [];
  selectedFlowEdgeIds.push(edge.id);

  setSelectedEdges(selectedFlowEdgeIds);
};

export const OnClickNode = (node: Block, setSelectedNodes: (nodeIds: string[]) => void) => {
  const selectedFlowNodeIds = [];
  selectedFlowNodeIds.push(node?.id);

  setSelectedNodes(selectedFlowNodeIds);
};

export const OnClickTerminal = () => {
  //TODO: Implement handler when Terminals can be selected for the inspector.
};
