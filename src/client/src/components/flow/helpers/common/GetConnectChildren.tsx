import { IsTransportTerminal } from ".";
import { Edge, Node } from "../../../../models";
import red from "../../../../redux/store";

const GetConnectChildren = (parentNode: Node): Node[] => {
  const edges = red.store.getState().projectState.project.edges as Edge[];
  let elements: Node[] = [];

  edges.forEach((edge) => {
    if (edge.fromNode === parentNode) {
      const node = edge.toNode;
      const connector = edge.toConnector;

      if (
        node?.aspect === parentNode?.aspect &&
        !IsTransportTerminal(connector)
      ) {
        elements.push(node);
      }
    }
  });
  return elements;
};

export default GetConnectChildren;
