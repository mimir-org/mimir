import { Edge, Node } from "../../../../models/project";

const TraverseTree = (
  edgeList: Edge[],
  nodeList: Node[],
  parentNode: Node,
  elements: (Node | Edge)[]
): void => {
  let children: Node[] = [];

  edgeList.forEach((edge) => {
    if (edge.fromNode === parentNode.id) {
      let node = nodeList.find((x) => x.id === edge.toNode);
      if (node.type === parentNode.type) {
        children.push(node);
        elements.push(node);
      }
      elements.push(edge);
    }
    if (edge.toNode === parentNode.id) elements.push(edge);
  });

  if (children.length === 0) return;

  children.forEach((node) => {
    TraverseTree(edgeList, nodeList, node, elements);
  });
};

export default TraverseTree;
