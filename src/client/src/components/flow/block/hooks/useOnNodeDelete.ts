import { Dispatch } from "redux";
import { Node, Edge } from "../../../../models";
import { deleteEdge, deleteNode } from "../../../../redux/store/project/actions";
import { IsOffPage } from "../../../../helpers/Aspects";
import { HandleOffPageNodeDelete } from "./helpers/HandleOffPageNodeDelete";
import { HandleOffPageEdgeDelete } from "./helpers/HandleOffPageEdgeDelete";
import { CloseInspector } from "../handlers/OnBlockSelectionChange";
import { IsEdgeConnectedToNode } from "../../helpers/IsEdgeConnectedToNode";

/**
 * Hook that runs when a node is deleted from Mimir in BlockView.
 * If a Node is deleted the connected Edges are also deleted.
 * If an Edge is deleted the connect Nodes will not be deleted, except an edge between OffPageNodes.
 * The removal of an Edge between OffPageNodes will also remove the connected Nodes.
 * @param nodesToDelete
 * @param inspectorRef
 * @param nodes
 * @param edges
 * @param dispatch
 */
const useOnNodeDelete = (
  nodesToDelete: Node[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  nodes: Node[],
  edges: Edge[],
  dispatch: Dispatch
) => {
  if (!nodesToDelete.length) return;

  nodesToDelete.forEach((node) => {
    IsOffPage(node) ? HandleOffPageNodeDelete(node, edges, dispatch) : HandleRelatedEdges(node.id, edges, nodes, dispatch);
    dispatch(deleteNode(node.id));
  });

  CloseInspector(inspectorRef, dispatch);
};

/**
 * Function to handle related edges to a node that is to be rmoved.
 * @param nodeToRemoveId
 * @param edges
 * @param nodes
 * @param dispatch
 */
function HandleRelatedEdges(nodeToRemoveId: string, edges: Edge[], nodes: Node[], dispatch: Dispatch) {
  edges.forEach((edge) => {
    const isRelated = IsEdgeConnectedToNode(edge, nodeToRemoveId);
    if (!isRelated) return;

    HandleOffPageEdgeDelete(edge, nodes, edges, dispatch);
    dispatch(deleteEdge(edge.id));
  });
}

export default useOnNodeDelete;
