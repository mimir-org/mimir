import * as helpers from "./OffPageDeleteFunctions";
import { Dispatch } from "redux";
import { Edge, Node } from "../../../../models";
import { deleteEdge, deleteNode, setOffPageStatus } from "../../../../redux/store/project/actions";

/**
 * Component to handle deleting an OffPageNode. There are two kinds of OffPage nodes -> Required and Connected.
 * A Required OffPageNode is deleted along with its transport edge and partOf edge, through HandleRequiredOffPageDelete.
 * A Connected OffPageNode is handled by HandleConnectedOffPageNode
 * @param nodeToDelete
 * @param nodes
 * @param edges
 * @param dispatch
 */
export const HandleOffPageNodeDelete = (nodeToDelete: Node, nodes: Node[], edges: Edge[], dispatch: Dispatch) => {
  const parentNodeId = nodeToDelete?.parentNodeId;
  if (!parentNodeId) return;

  const transportEdge = helpers.GetOffPageTransportEdge(nodeToDelete.id, parentNodeId, edges);
  const partOfEdge = helpers.GetPartOfEdge(nodeToDelete.id, parentNodeId, edges);
  const parentConnectorId = helpers.GetParentConnector(transportEdge, nodeToDelete.id)?.id;

  if (nodeToDelete.isOffPageRequired) return HandleRequiredOffPageDelete(parentNodeId, parentConnectorId, partOfEdge, dispatch);
  return HandleConnectedOffPageDelete(partOfEdge, transportEdge, parentConnectorId, nodes, edges, dispatch);
};

/**
 * Handler for deleting a Required OffPageNode.
 * @param parentNodeId
 * @param parentConnectorId
 * @param partOfEdge
 * @param dispatch
 */
function HandleRequiredOffPageDelete(parentNodeId: string, parentConnectorId: string, partOfEdge: Edge, dispatch: Dispatch) {
  dispatch(setOffPageStatus(parentNodeId, parentConnectorId, false));
  if (partOfEdge) dispatch(deleteEdge(partOfEdge.id));
}

/**
 * Handler for deleting a Connected OffPageNode. All related OffPage nodes and edges are deleted.
 * A Connected OffPageNode appears if a node has a transport connection to a node not displayed on the screen.
 * When deleting a Connected OffPageNode, the actual transport edge that the OffPageNode refers to is deleted.
 * The opposite Connected OffPageNode and edges are also removed.
 * @param partOfEdge
 * @param transportEdge
 * @param parentConnectorId
 * @param nodes
 * @param edges
 * @param dispatch
 */
export function HandleConnectedOffPageDelete(
  partOfEdge: Edge,
  transportEdge: Edge,
  parentConnectorId: string,
  nodes: Node[],
  edges: Edge[],
  dispatch: Dispatch
) {
  const mainEdge = helpers.GetConnectedEdge(parentConnectorId, edges);
  const counterTransportEdge = helpers.GetCounterTransportEdge(edges, mainEdge, transportEdge);
  const counterOffPageNode = helpers.GetCounterOffPageNode(nodes, counterTransportEdge);
  const counterParentId = counterOffPageNode?.parentNodeId;
  const counterPartOfEdge = helpers.GetPartOfEdge(counterOffPageNode?.id, counterParentId, edges);

  DeleteOffPageElements(partOfEdge, transportEdge, mainEdge, dispatch);
  DeleteCounterOffPageElements(counterPartOfEdge, counterTransportEdge, counterOffPageNode, dispatch);
}

/**
 * Function to delete all counter OffPageElements.
 * @param counterPartOfEdge
 * @param counterTransportEdge
 * @param counterOffPageNode
 * @param dispatch
 */
export function DeleteCounterOffPageElements(
  counterPartOfEdge: Edge,
  counterTransportEdge: Edge,
  counterOffPageNode: Node,
  dispatch: Dispatch
) {
  if (counterPartOfEdge) dispatch(deleteEdge(counterPartOfEdge.id));
  if (counterTransportEdge) dispatch(deleteEdge(counterTransportEdge.id));
  if (counterOffPageNode) dispatch(deleteNode(counterOffPageNode.id));
}

/**
 * Function to delete all OffPageElements.
 * @param partOfEdge
 * @param transportEdge
 * @param mainEdge
 * @param dispatch
 * @param offPageNode
 */
export function DeleteOffPageElements(
  partOfEdge: Edge,
  transportEdge: Edge,
  mainEdge: Edge,
  dispatch: Dispatch,
  offPageNode?: Node
) {
  if (partOfEdge) dispatch(deleteEdge(partOfEdge.id));
  if (transportEdge) dispatch(deleteEdge(transportEdge.id));
  if (mainEdge) dispatch(deleteEdge(mainEdge.id));
  if (offPageNode) dispatch(deleteNode(offPageNode.id));
}
