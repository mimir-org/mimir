import { Dispatch } from "redux";
import { Project, Node } from "../../../../models";
import { deleteEdge, deleteNode } from "../../../../redux/store/project/actions";
import { IsAspectNode, IsOffPage } from "../../../../helpers/Aspects";
import { HandleOffPageNodeDelete } from "./helpers/HandleOffPageNodeDelete";
import { HandleOffPageEdgeDelete } from "./helpers/HandleOffPageEdgeDelete";
import { CloseInspector } from "../handlers";

/**
 * Hook that runs when a node is deleted from Mimir in BlockView.
 * If a Node is deleted the connected Edges are also deleted.
 * If an Edge is deleted the connect Nodes will not be deleted, except an edge between OffPageNodes.
 * The removal of an Edge between OffPageNodes will also remove the connected Nodes.
 * @param nodesToDelete
 * @param inspectorRef
 * @param project
 * @param dispatch
 */
const useOnNodeDelete = (
  nodesToDelete: Node[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  dispatch: Dispatch
) => {
  if (!nodesToDelete.length) return;

  let hasDeleted = false;

  nodesToDelete.forEach((node) => {
    if (IsAspectNode(node) || node.isLocked) return;

    DeleteRelatedEdges(node.id, project, dispatch);
    IsOffPage(node) ? HandleOffPageNodeDelete(node.id, project, dispatch) : HandleRelatedEdges(node.id, project, dispatch);

    hasDeleted = true;
    dispatch(deleteNode(node.id));
  });

  if (hasDeleted) CloseInspector(inspectorRef, dispatch);
};

/**
 * Function to delete all edges related to a node that is to be deleted.
 * Note: the edges must be deleted before the node.
 * @param nodeId
 * @param project
 * @param dispatch
 */
function DeleteRelatedEdges(nodeId: string, project: Project, dispatch: Dispatch) {
  project.edges.forEach((edge) => {
    if (edge.fromNodeId === nodeId || edge.toNodeId === nodeId) dispatch(deleteEdge(edge.id));
  });
}

function HandleRelatedEdges(nodeToRemoveId: string, project: Project, dispatch: Dispatch) {
  project.edges?.forEach((edge) => {
    const isRelated = edge.fromNodeId === nodeToRemoveId || edge.toNodeId === nodeToRemoveId;
    if (!isRelated) return;

    HandleOffPageEdgeDelete(edge, project, dispatch);

    const node = project.nodes.find((n) => n.id === edge.toNodeId);
    if (!node?.isLocked) dispatch(deleteEdge(edge.id));
  });
}

export default useOnNodeDelete;
