import { Dispatch } from "redux";
import { IsOffPage } from "../../../../helpers/Aspects";
import { Edge, Node } from "../../../../models";
import { deleteEdge, deleteNode, setOffPageStatus } from "../../../../redux/store/project/actions";
import {
  GetOppositeOffPageEdge,
  GetConnectedEdge,
  GetParentConnector,
  GetPartOfEdge,
  GetOffPageEdge,
} from "./OffPageDeleteFunctions";

/**
 * Component to handle deleting an OffPageNode. There are two kinds of OffPage nodes -> Required and Connected.
 * A Required OffPageNode is deleted along with its transport edge and partOf edge.
 * A Connected OffPageNode is handled by HandleConnectedOffPageNode
 * @param nodeToDelete
 * @param edges
 * @param dispatch
 */
export const HandleOffPageNodeDelete = (nodeToDelete: Node, edges: Edge[], dispatch: Dispatch) => {
  const parentNodeId = nodeToDelete?.parentNodeId;
  if (!parentNodeId) return;

  const offPageEdge = GetOffPageEdge(nodeToDelete.id, parentNodeId, edges);
  const partOfEdge = GetPartOfEdge(nodeToDelete.id, parentNodeId, edges);
  const parentConnectorId = GetParentConnector(offPageEdge, nodeToDelete.id)?.id;
  const mainEdge = GetConnectedEdge(parentConnectorId, edges);

  if (offPageEdge && !mainEdge) dispatch(setOffPageStatus(parentNodeId, parentConnectorId, false));
  if (mainEdge) HandleConnectedOffPageDelete(edges, offPageEdge, mainEdge, dispatch);
  if (partOfEdge) dispatch(deleteEdge(partOfEdge.id));
};

/**
 * Handler for deleting a Connected OffPageNode. All related OffPage nodes and edges are deleted.
 * A Connected OffPageNode appears if a node is connected to a node not displayed on the screen.
 * When deleting a Connected OffPageNode, the actual transport edge that the OffPageNode refers to is deleted.
 * The opposite Connected OffPageNode and edges are also removed.
 * @param edges
 * @param offPageEdge
 * @param mainEdge
 * @param dispatch
 */
export const HandleConnectedOffPageDelete = (edges: Edge[], offPageEdge: Edge, mainEdge: Edge, dispatch: Dispatch) => {
  const oppositeOffPageEdge = GetOppositeOffPageEdge(edges, mainEdge, offPageEdge);
  const oppositeOffPageNode = IsOffPage(oppositeOffPageEdge.toNode) ? oppositeOffPageEdge.toNode : oppositeOffPageEdge.fromNode;
  const oppositeParentId = oppositeOffPageNode?.parentNodeId;
  const oppositePartOfEdge = GetPartOfEdge(oppositeOffPageNode?.id, oppositeParentId, edges);

  dispatch(deleteEdge(mainEdge.id)); // This is the main edge that the connectedEdge is refering to
  dispatch(deleteEdge(offPageEdge.id)); // This is the edge pointing to the Connected OffPageNode

  if (oppositeOffPageNode) dispatch(deleteNode(oppositeOffPageNode.id));
  if (oppositeOffPageEdge) dispatch(deleteEdge(oppositeOffPageEdge.id));
  if (oppositePartOfEdge) dispatch(deleteEdge(oppositePartOfEdge.id));
};
