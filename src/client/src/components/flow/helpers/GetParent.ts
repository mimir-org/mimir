import red from "../../../redux/store";
import { IsPartOf } from ".";
import { Node } from "../../../models";

/**
 * Function to find a node's parentNode
 * @param childNode - the child node
 * @returns the parentNode, if any
 */
const GetParent = (childNode: Node) => {
  const edges = red.store.getState().projectState.project?.edges;
  const nodes = red.store.getState().projectState.project?.nodes;

  const parentEdge = edges?.find((e) => e.toNodeId === childNode?.id && IsPartOf(e.toConnector));
  const parentNode = nodes?.find((n) => n.id === parentEdge?.fromNodeId);

  return parentNode ?? null;
};

export default GetParent;
