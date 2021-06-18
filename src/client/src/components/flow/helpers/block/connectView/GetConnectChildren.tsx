import red from "../../../../../redux/store";
import { IsTransportTerminal } from "../../common";
import { Edge, Node } from "../../../../../models";

const GetConnectChildren = (parentNode: Node): Node[] => {
  const edges = red.store.getState().projectState.project.edges as Edge[];
  let elements: Node[] = [];

  edges.forEach((edge) => {
    if (
      edge.fromNodeId === parentNode.id &&
      edge.toNode?.aspect === parentNode?.aspect &&
      !IsTransportTerminal(edge.toConnector)
    ) {
      elements.push(edge.toNode);
    }
  });
  return elements;
};

export default GetConnectChildren;
