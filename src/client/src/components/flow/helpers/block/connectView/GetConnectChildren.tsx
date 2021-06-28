import red from "../../../../../redux/store";
import { IsPartOfTerminal } from "../../common";
import { Edge, Node } from "../../../../../models";

const GetConnectChildren = (parentNode: Node): Node[] => {
  const edges = red.store.getState().projectState.project.edges as Edge[];
  const nodes = red.store.getState().projectState.project.nodes as Node[];

  let elements: Node[] = [];

  edges.forEach((edge) => {
    if (
      edge.fromNodeId === parentNode.id &&
      edge.toNode?.aspect === parentNode?.aspect &&
      IsPartOfTerminal(edge.toConnector)
    ) {
      const toNode = nodes.find((node) => node.id === edge.toNodeId);
      elements.push(toNode);
    }
  });
  return elements;
};

export default GetConnectChildren;
