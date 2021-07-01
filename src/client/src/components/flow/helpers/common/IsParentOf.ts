import { IsPartOfTerminal } from ".";
import { Node, Edge } from "../../../../models";
import red from "../../../../redux/store";

const IsParentOf = (parentNode: Node, childNode: Node) => {
  const edges = red.store.getState().projectState.project.edges as Edge[];
  const edge = edges.find(
    (x) => x.toNodeId === childNode?.id && x.fromNodeId === parentNode?.id
  );

  return edge && IsPartOfTerminal(edge.fromConnector);
};

export default IsParentOf;
