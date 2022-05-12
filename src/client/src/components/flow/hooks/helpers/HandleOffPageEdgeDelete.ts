import * as helpers from "./OffPageDeleteFunctions";
import { Dispatch } from "redux";
import { IsOffPage } from "../../../../helpers/Aspects";
import { Edge, Node } from "../../../../models";
import { deleteEdge, deleteNode, setOffPageStatus } from "../../../../redux/store/project/actions";
import { IsPartOfTerminal } from "../../helpers/Connectors";
import { DeleteCounterOffPageElements, DeleteOffPageElements } from "./HandleOffPageNodeDelete";

/**
 * When deleting an edge it needs to be checked if that edge has generated some connected OffPage elements.
 * If so, all related edges and nodes are deleted.
 * @param edgeToDelete
 * @param nodes
 * @param edges
 * @param dispatch
 */
export const HandleOffPageEdgeDelete = (edgeToDelete: Edge, nodes: Node[], edges: Edge[], dispatch: Dispatch) => {
  if (!edgeToDelete) return;

  // Find offpage nodes, if any
  let offPageNode: Node;
  if (IsOffPage(edgeToDelete.toNode)) offPageNode = edgeToDelete.toNode;
  else if (IsOffPage(edgeToDelete.fromNode)) offPageNode = edgeToDelete.fromNode;

  if (offPageNode) {
    if (offPageNode.isOffPageRequired) return HandleDeleteRequiredOffPageNode(offPageNode, edgeToDelete, edges, dispatch);
    return HandleDeleteConnectedOffPageNode(offPageNode, edgeToDelete, nodes, edges, dispatch);
  }

  dispatch(deleteEdge(edgeToDelete.id));
};

function HandleDeleteRequiredOffPageNode(offPageNode: Node, edgeToDelete: Edge, edges: Edge[], dispatch: Dispatch) {
  const parentConnectorId =
    edgeToDelete.fromConnector.nodeId === offPageNode.parentNodeId ? edgeToDelete.toConnectorId : edgeToDelete.fromConnectorId;

  const partOfEdge = edges.find((e) => e.toNodeId === offPageNode.id && IsPartOfTerminal(e.fromConnector));
  if (partOfEdge) dispatch(deleteEdge(partOfEdge.id));
  dispatch(deleteEdge(edgeToDelete.id));
  dispatch(deleteNode(offPageNode.id));
  dispatch(setOffPageStatus(offPageNode.parentNodeId, parentConnectorId, false));
}

function HandleDeleteConnectedOffPageNode(
  offPageNode: Node,
  edgeToDelete: Edge,
  nodes: Node[],
  edges: Edge[],
  dispatch: Dispatch
) {
  const partOfEdge = edges.find((e) => e.toNodeId === offPageNode.id && IsPartOfTerminal(e.fromConnector));
  const parentConnectorId = helpers.GetParentConnector(edgeToDelete, offPageNode.id)?.id;
  const mainEdge = helpers.GetConnectedEdge(parentConnectorId, edges);
  const counterTransportEdge = helpers.GetCounterTransportEdge(edges, mainEdge, edgeToDelete);
  const counterOffPageNode = helpers.GetCounterOffPageNode(nodes, counterTransportEdge);
  const counterParentId = counterOffPageNode?.parentNodeId;
  const counterPartOfEdge = helpers.GetPartOfEdge(counterOffPageNode?.id, counterParentId, edges);

  // Delete the first OffPageNode and edges
  DeleteOffPageElements(partOfEdge, edgeToDelete, mainEdge, dispatch, offPageNode);

  // Delete the counter OffPageNode and edges
  DeleteCounterOffPageElements(counterPartOfEdge, counterTransportEdge, counterOffPageNode, dispatch);
}
