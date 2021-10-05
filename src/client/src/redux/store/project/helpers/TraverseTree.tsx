import { IsPartOfTerminal } from "../../../../components/flow/helpers";
import { Edge, Node } from "../../../../models";

const TraverseTree = (
  edgeList: Edge[],
  nodeList: Node[],
  parentNode: Node,
  elements: (Node | Edge)[]
) => {
  let children: Node[] = [];

  edgeList.forEach((edge) => {
    if (edge.fromNodeId === parentNode.id) {
      let node = nodeList.find((x) => x.id === edge.toNodeId);
      const connector = node?.connectors?.find((x) => x.id === edge?.toConnectorId);

      if (node?.aspect === parentNode?.aspect && IsPartOfTerminal(connector)) {
        children.push(node);
        elements.push(node);
      }
      elements.push(edge);
    }
    if (edge.toNodeId === parentNode.id) elements.push(edge);
  });

  if (children.length === 0) return;

  children.forEach((node) => {
    TraverseTree(edgeList, nodeList, node, elements);
  });
};

export default TraverseTree;
