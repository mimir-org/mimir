import red from "../../../../../../redux/store/index";
import { IsPartOfRelation } from "../../../../helpers/Connectors";

/**
 * Function to find a node's childNode.
 * NOTE: this is used to traverse down one step in BlockView. How to find the correct child node is not yet implemented.
 * @param nodeId - the parent node
 * @returns the childNode's id
 */

export const GetChild = (nodeId: string) => {
  const edges = red.store.getState().projectState.project.edges;
  const nodes = red.store.getState().projectState.project.nodes;

  const childEdge = edges.find((e) => e.fromNodeId === nodeId && IsPartOfRelation(e.toConnector));
  const childNode = nodes.find((n) => n.id === childEdge?.toNodeId);

  return childNode?.id ?? nodeId;
};
