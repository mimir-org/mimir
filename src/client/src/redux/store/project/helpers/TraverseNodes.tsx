import { Edge, Node } from "../../../../models/project";

const TraverseNodes = (
  edge: Edge,
  nodeList: Node[],
  edgeList: Edge[],
  children: (Node | Edge)[]
) => {
  const nextNode = nodeList.find(
    (x) => x.id === edgeList.find((x) => x.id === edge.id).toNode
  );
  children.push(nextNode, edge);

  const nextEdge = edgeList.find((x) => x.fromNode === nextNode.id);

  if (nextEdge) TraverseNodes(nextEdge, nodeList, edgeList, children);
};

export default TraverseNodes;
