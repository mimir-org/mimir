import red from "../../../../../../../redux/store";
import { Node } from "@mimirorg/modelbuilder-types";

/**
 * Component to check if a node has children nodes.
 * @param node
 * @returns a boolean value.
 */
export const HasChildren = (node: Node) => {
  const edges = red.store.getState().projectState.project?.edges;
  const edge = edges?.find((e) => e.fromNodeId === node?.id);

  return edge; //&& IsPartOfRelation(edge.fromConnector); // TODO: fix
};
