import red from "../../../redux/store";
import { IsPartOf } from ".";
import { Node, Edge } from "../../../models";

/**
 * Function to find a node's parentNode
 * @param childNode - the child node
 * @param nodes - all nodes
 * @param edges  - all edges
 * @returns the parentNode
 */
const GetParent = (childNode: Node) => {
  const edges = red.store.getState().projectState.project?.edges as Edge[];
  const nodes = red.store.getState().projectState.project?.nodes as Node[];

  const parentEdge = edges?.find((e) => e.toNodeId === childNode?.id && IsPartOf(e.toConnector));
  const parentNode = nodes?.find((n) => n.id === parentEdge?.fromNodeId);

  return parentNode ?? childNode;
};

export default GetParent;
