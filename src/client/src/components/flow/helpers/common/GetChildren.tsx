import { IsTransportTerminal } from ".";
import { Edge, Node } from "../../../../models/project";
import red from "../../../../redux/store";

const GetChildren = (parentNode: Node): Node[] => {
  const edges = red.store.getState().projectState.project.edges as Edge[];
  const nodes = red.store.getState().projectState.project.nodes as Node[];
  let elements: Node[] = [];

  edges.forEach((edge) => {
    if (edge.fromNode === parentNode.id) {
      const node = nodes.find((x) => x.id === edge.toNode);
      const connector = node?.connectors?.find(
        (x) => x.id === edge?.toConnector
      );

      if (node.type === parentNode.type && !IsTransportTerminal(connector)) {
        elements.push(node);
      }
    }
  });
  return elements;
};

export default GetChildren;
