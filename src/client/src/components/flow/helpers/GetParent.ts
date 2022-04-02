import red from "../../../redux/store";
import { IsPartOf } from ".";

/**
 * Function to find a node's parentNode
 * @param childNodeId - the child node
 * @returns the parentNode, if any
 */
const GetParent = (childNodeId: string) => {
  const edges = red.store.getState().projectState.project?.edges;
  const nodes = red.store.getState().projectState.project?.nodes;

  const parentEdge = edges?.find((e) => e.toNodeId === childNodeId && IsPartOf(e.toConnector));
  const parentNode = nodes?.find((n) => n.id === parentEdge?.fromNodeId);

  return parentNode ?? null;
};

export default GetParent;
