import { IsPartOfTerminal } from ".";
import { Node, Edge } from "../../../../models";
import red from "../../../../redux/store";

const IsChildOf = (childNode: Node, parentNode: Node) => {
  const edges = red.store.getState().projectState.project.edges as Edge[];
  const edge = edges.find(
    (x) => x.fromNodeId === parentNode?.id && x.toNodeId === childNode?.id
  );

  return edge && IsPartOfTerminal(edge.fromConnector);
};

export default IsChildOf;
