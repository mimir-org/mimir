import { Edge, Node } from "../../../../models/project";

const TraverseNodes = (
  edge: Edge,
  nodeList: Node[],
  edgeList: Edge[],
  elements: (Node | Edge)[],
  type: string
) => {
  const nextNode = nodeList.find(
    (x) => x.id === edgeList.find((x) => x.id === edge.id).toNode
  );
  if (nextNode.type === type) {
    elements.push(nextNode, edge);
  }

  const nextEdge = edgeList.find((x) => x.fromNode === nextNode.id);

  if (nextEdge) TraverseNodes(nextEdge, nodeList, edgeList, elements, type);
};

export default TraverseNodes;
