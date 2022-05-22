import { Dispatch } from "redux";
import { IsOffPage } from "../../../helpers/Aspects";
import { Node, Edge } from "../../../models";
import { deleteEdge, deleteNode } from "../../../redux/store/project/actions";
import { IsEdgeConnectedToNode } from "../helpers/IsEdgeConnectedToNode";
import { CloseInspector } from "../tree/handlers";
import { HandleOffPageEdgeDelete } from "./helpers/HandleOffPageEdgeDelete";
import { HandleOffPageNodeDelete } from "./helpers/HandleOffPageNodeDelete";

/**
 * Hook that runs when a node is deleted from Mimir. This hook is used both in TreeView and BlockView.
 * A node can be deleted with the delete button from a keyboard, or the delete button in Mimir's Inspector.
 * If a Node is deleted the connected Edges are also deleted.
 * The removal of an Edge between OffPageNodes will also remove the connected Nodes.
 * @param nodesToDelete
 * @param nodes
 * @param edges
 * @param selectedBlockNode
 * @param inspectorRef
 * @param dispatch
 */
export const useOnNodeDelete = (
  nodesToDelete: Node[],
  nodes: Node[],
  edges: Edge[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch,
  selectedBlockNode?: Node
) => {
  if (!nodesToDelete.length) return;

  nodesToDelete.forEach((node) => {
    if (node.id === selectedBlockNode.id) return;
    DeleteRelatedEdges(node.id, edges, dispatch);

    if (IsOffPage(node)) return HandleOffPageNodeDelete(node, nodes, edges, dispatch);

    HandleRelatedEdges(node.id, nodes, edges, dispatch);
    dispatch(deleteNode(node.id));
  });

  CloseInspector(inspectorRef, dispatch);
};

/**
 * Function to delete all edges related to a node that is to be deleted.
 * Note: the edges must be deleted before the node.
 * @param nodeId
 * @param edges
 * @param dispatch
 */
function DeleteRelatedEdges(nodeId: string, edges: Edge[], dispatch: Dispatch) {
  edges.forEach((edge) => {
    if (IsEdgeConnectedToNode(edge, nodeId)) dispatch(deleteEdge(edge.id));
  });
}

/**
 * Function to handle related edges to a node that is to be removed.
 * @param nodeToRemoveId
 * @param nodes
 * @param edges
 * @param dispatch
 */
function HandleRelatedEdges(nodeToRemoveId: string, nodes: Node[], edges: Edge[], dispatch: Dispatch) {
  edges.forEach((edge) => {
    if (!IsEdgeConnectedToNode(edge, nodeToRemoveId)) return;

    HandleOffPageEdgeDelete(edge, nodes, edges, dispatch);
    dispatch(deleteEdge(edge.id));
  });
}
