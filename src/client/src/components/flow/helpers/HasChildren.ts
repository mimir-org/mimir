import red from "../../../redux/store";
import { IsPartOf } from ".";
import { Node, Edge } from "../../../models";

/**
 * Component to check if a node has children nodes.
 * @param node
 * @returns a boolean value.
 */
const HasChildren = (node: Node) => {
  const edges = red.store.getState().projectState.project?.edges as Edge[];
  const edge = edges?.find((e) => e.fromNodeId === node?.id);

  return edge && IsPartOf(edge.fromConnector);
};

export default HasChildren;
