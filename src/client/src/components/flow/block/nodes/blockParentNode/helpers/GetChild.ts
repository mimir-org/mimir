import red from "../../../../../../redux/store/index";
import { IsPartOfRelation } from "../../../../helpers/Connectors";

/**
 * Function to find a node's childNode
 * @param nodeId - the parent node
 * @param project
 * @returns the parentNode
 */
// TODO: this is used to traverse down one step in BlockView. How to find the correct child node will be defined later.
export const GetChild = (nodeId: string) => {
  const edges = red.store.getState().projectState.project.edges;
  const nodes = red.store.getState().projectState.project.nodes;

  const childEdge = edges.find((e) => e.fromNodeId === nodeId); //&& IsPartOfRelation(e.toConnector)); // TODO: fix
  const childNode = nodes.find((n) => n.id === childEdge?.toNodeId);

  return childNode?.id ?? nodeId;
};
