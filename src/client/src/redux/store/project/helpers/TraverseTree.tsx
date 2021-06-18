import { IsPartOfTerminal } from "../../../../components/flow/helpers/common";
import { Edge, Node } from "../../../../models";

const TraverseTree = (
  edgeList: Edge[],
  nodeList: Node[],
  parentNode: Node,
  elements: (Node | Edge)[]
) => {
  let children: Node[] = [];

  edgeList.forEach((edge) => {
    if (edge.fromNode === parentNode) {
      let node = nodeList.find((node) => node === edge.toNode);
      const connector = node?.connectors?.find((x) => x === edge?.toConnector);

      if (node.aspect === parentNode.aspect && IsPartOfTerminal(connector)) {
        children.push(node);
        elements.push(node);
      }
      elements.push(edge);
    }
    if (edge.toNode === parentNode) elements.push(edge);
  });

  if (children.length === 0) return;

  children.forEach((node) => {
    TraverseTree(edgeList, nodeList, node, elements);
  });
};

export default TraverseTree;
