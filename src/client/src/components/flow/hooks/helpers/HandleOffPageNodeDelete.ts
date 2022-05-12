import * as helpers from "./OffPageDeleteFunctions";
import { Dispatch } from "redux";
import { Edge, Node } from "../../../../models";
import { deleteEdge, deleteNode, setOffPageStatus } from "../../../../redux/store/project/actions";

/**
 * Component to handle deleting an OffPageNode. There are two kinds of OffPage nodes -> Required and Connected.
 * A Required OffPageNode is deleted along with its transport edge and partOf edge, through HandleRequiredOffPageDelete.
 * A Connected OffPageNode is handled by HandleConnectedOffPageDelete.
 * @param nodeToDelete
 * @param nodes
 * @param edges
 * @param dispatch
 */
export const HandleOffPageNodeDelete = (nodeToDelete: Node, nodes: Node[], edges: Edge[], dispatch: Dispatch) => {
  const parentNodeId = nodeToDelete?.parentNodeId;
  if (!parentNodeId) return;

  const transportEdge = helpers.GetOffPageTransportEdge(nodeToDelete.id, parentNodeId, edges);

  return nodeToDelete.isOffPageRequired
    ? HandleRequiredOffPageDelete(nodeToDelete, transportEdge, parentNodeId, edges, dispatch)
    : HandleConnectedOffPageDelete(nodeToDelete, transportEdge, nodes, edges, dispatch);
};

/**
 * Handler for deleting a Required OffPageNode and releated edges.
 * @param offPageNode
 * @param transportEdge
 * @param parentNodeId
 * @param dispatch
 */
export function HandleRequiredOffPageDelete(
  offPageNode: Node,
  transportEdge: Edge,
  parentNodeId: string,
  edges: Edge[],
  dispatch: Dispatch
) {
  const partOfEdge = helpers.GetPartOfEdge(offPageNode.id, parentNodeId, edges);
  const parentConnectorId = helpers.GetParentConnectorId(transportEdge, offPageNode.id);

  if (partOfEdge) dispatch(deleteEdge(partOfEdge.id));
  if (transportEdge) dispatch(deleteEdge(transportEdge.id));
  dispatch(setOffPageStatus(parentNodeId, parentConnectorId, false));
  if (offPageNode) dispatch(deleteNode(offPageNode.id));
}

/**
 * Handler for deleting a Connected OffPageNode. All related OffPage nodes and edges are deleted.
 * A Connected OffPageNode appears if a node has a transport connection to a node not displayed on the screen.
 * When deleting a Connected OffPageNode, the actual transport edge that the OffPageNode refers to is deleted.
 * The opposite Connected OffPageNode and edges are also removed.
 * @param transportEdge
 * @param nodes
 * @param edges
 * @param dispatch
 */
export function HandleConnectedOffPageDelete(
  offPageNode: Node,
  transportEdge: Edge,
  nodes: Node[],
  edges: Edge[],
  dispatch: Dispatch
) {
  const partOfEdge = helpers.GetPartOfEdge(offPageNode.id, offPageNode.parentNodeId, edges);
  const parentConnectorId = helpers.GetParentConnectorId(transportEdge, offPageNode.id);

  const mainEdge = helpers.GetConnectedEdge(parentConnectorId, edges);
  const counterTransportEdge = helpers.GetCounterTransportEdge(edges, mainEdge, transportEdge);
  const counterOffPageNode = helpers.GetCounterOffPageNode(nodes, counterTransportEdge);
  const counterParentId = counterOffPageNode?.parentNodeId;
  const counterPartOfEdge = helpers.GetPartOfEdge(counterOffPageNode?.id, counterParentId, edges);

  DeleteConnectedOffPageElements(offPageNode, partOfEdge, transportEdge, mainEdge, dispatch);
  DeleteConnectedCounterOffPageElements(counterPartOfEdge, counterTransportEdge, counterOffPageNode, dispatch);
}

/**
 * Function to delete connected OffPageElements.
 * @param offPageNode
 * @param partOfEdge
 * @param transportEdge
 * @param mainEdge
 * @param dispatch
 */
export function DeleteConnectedOffPageElements(
  offPageNode: Node,
  partOfEdge: Edge,
  transportEdge: Edge,
  mainEdge: Edge,
  dispatch: Dispatch
) {
  if (partOfEdge) dispatch(deleteEdge(partOfEdge.id));
  if (transportEdge) dispatch(deleteEdge(transportEdge.id));
  if (mainEdge) dispatch(deleteEdge(mainEdge.id));
  if (offPageNode) dispatch(deleteNode(offPageNode.id));
}

/**
 * Function to delete connected counter OffPageElements.
 * @param counterPartOfEdge
 * @param counterTransportEdge
 * @param counterOffPageNode
 * @param dispatch
 */
export function DeleteConnectedCounterOffPageElements(
  counterPartOfEdge: Edge,
  counterTransportEdge: Edge,
  counterOffPageNode: Node,
  dispatch: Dispatch
) {
  if (counterPartOfEdge) dispatch(deleteEdge(counterPartOfEdge.id));
  if (counterTransportEdge) dispatch(deleteEdge(counterTransportEdge.id));
  if (counterOffPageNode) dispatch(deleteNode(counterOffPageNode.id));
}
