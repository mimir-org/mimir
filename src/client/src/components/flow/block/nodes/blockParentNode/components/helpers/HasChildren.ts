import red from "../../../../../../../redux/store";
import { IsPartOfTerminal } from "../../../../../helpers/Connectors";
import { Node } from "../../../../../../../models";

/**
 * Component to check if a node has children nodes.
 * @param node
 * @returns a boolean value.
 */
export const HasChildren = (node: Node) => {
  const edges = red.store.getState().projectState.project?.edges;
  const edge = edges?.find((e) => e.fromNodeId === node?.id);

  return edge && IsPartOfTerminal(edge.fromConnector);
};
