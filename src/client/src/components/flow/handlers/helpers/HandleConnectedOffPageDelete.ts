import * as helpers from "./OffPageDeleteFunctions";
import { Dispatch } from "redux";
import { Node, Edge } from "@mimirorg/modelbuilder-types";
import { deleteEdge, deleteNode } from "../../../../redux/store/project/actions";

/**
 * Component for deleting a Connected OffPageNode. All related OffPage nodes and edges are deleted.
 * A Connected OffPageNode appears if a node has a transport connection to a node not displayed on the screen.
 * When deleting a Connected OffPageNode, the actual transport edge that the OffPageNode refers to is deleted.
 * The opposite Connected OffPageNode and edges are also removed.
 * @param transportEdge
 * @param nodes
 * @param edges
 * @param dispatch
 */
export const HandleConnectedOffPageDelete = (
  offPageNode: Node,
  transportEdge: Edge,
  nodes: Node[],
  edges: Edge[],
  dispatch: Dispatch
) => {
  const partOfEdge = helpers.GetOffPagePartOfEdge(offPageNode.id, offPageNode.parentNodeId, edges);
  const parentConnectorId = helpers.GetParentConnectorId(transportEdge, offPageNode.id);

  const mainEdge = helpers.GetConnectedEdge(parentConnectorId, edges);
  const counterTransportEdge = helpers.GetCounterTransportEdge(edges, mainEdge, transportEdge);
  const counterOffPageNode = helpers.GetCounterOffPageNode(nodes, counterTransportEdge);
  const counterParentId = counterOffPageNode?.parentNodeId;
  const counterPartOfEdge = helpers.GetOffPagePartOfEdge(counterOffPageNode?.id, counterParentId, edges);

  DeleteConnectedOffPageElements(offPageNode, partOfEdge, transportEdge, mainEdge, dispatch);
  DeleteConnectedCounterOffPageElements(counterPartOfEdge, counterTransportEdge, counterOffPageNode, dispatch);
};

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
