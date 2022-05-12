import { Dispatch } from "redux";
import { IsOffPage } from "../../../../helpers/Aspects";
import { Edge, Node } from "../../../../models";
import { deleteEdge } from "../../../../redux/store/project/actions";
import { HandleConnectedOffPageDelete, HandleRequiredOffPageDelete } from "./HandleOffPageNodeDelete";

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

  // Find offpage node, if any
  const offPageNode = FindOffPageNode(nodes, edgeToDelete);

  if (offPageNode) {
    return offPageNode.isOffPageRequired
      ? HandleRequiredOffPageDelete(offPageNode, edgeToDelete, offPageNode.parentNodeId, edges, dispatch)
      : HandleConnectedOffPageDelete(offPageNode, edgeToDelete, nodes, edges, dispatch);
  }

  dispatch(deleteEdge(edgeToDelete.id));
};

function FindOffPageNode(nodes: Node[], edgeToDelete: Edge) {
  if (IsOffPage(edgeToDelete.toNode)) return nodes.find((n) => n.id === edgeToDelete.toNodeId);
  if (IsOffPage(edgeToDelete.fromNode)) return nodes.find((n) => n.id === edgeToDelete.fromNodeId);
}
