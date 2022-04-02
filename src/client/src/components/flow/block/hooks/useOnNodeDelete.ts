import { Node as FlowNode } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Project } from "../../../../models";
import { removeEdge, removeNode } from "../../../../redux/store/project/actions";
import { FindMimirNodeByFlowNodeId } from "../../helpers";
import { IsAspectNode, IsOffPage } from "../../../../helpers/Aspects";
import { CloseInspector } from "../../handlers";
import { HandleOffPageNodeDelete } from "./helpers/HandleOffPageNodeDelete";
import { HandleOffPageEdgeDelete } from "./helpers/HandleOffPageEdgeDelete";

/**
 * Hook that runs when a node is deleted from Mimir in BlockView.
 * If a Node is deleted the connected Edges are also deleted.
 * If an Edge is deleted the connect Nodes will not be deleted, except an edge between OffPageNodes.
 * The removal of an Edge between OffPageNodes will also remove the connected Nodes.
 * @param flowNodesToDelete
 * @param inspectorRef
 * @param project
 * @param dispatch
 */
const useOnNodeDelete = (
  flowNodesToDelete: FlowNode[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  dispatch: Dispatch
) => {
  let hasDeleted = false;

  flowNodesToDelete.forEach((flowNode) => {
    if (IsAspectNode(flowNode.data)) return;

    const nodeToDelete = FindMimirNodeByFlowNodeId(project, flowNode.id);
    if (nodeToDelete?.isLocked) return;

    DeleteRelatedEdges(nodeToDelete.id, project, dispatch);

    IsOffPage(nodeToDelete)
      ? HandleOffPageNodeDelete(nodeToDelete.id, project, dispatch)
      : HandleRelatedEdges(nodeToDelete.id, project, dispatch);

    hasDeleted = true;
    dispatch(removeNode(flowNode.id));
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
    if (edge.fromNodeId === nodeId || edge.toNodeId === nodeId) dispatch(removeEdge(edge.id));
  });
}

function HandleRelatedEdges(nodeToRemoveId: string, project: Project, dispatch: Dispatch) {
  project.edges?.forEach((edge) => {
    const isRelated = edge.fromNodeId === nodeToRemoveId || edge.toNodeId === nodeToRemoveId;
    if (!isRelated) return;

    HandleOffPageEdgeDelete(edge, project, dispatch);

    const node = project.nodes.find((n) => n.id === edge.toNodeId);
    if (!node?.isLocked) dispatch(removeEdge(edge.id));
  });
}

export default useOnNodeDelete;
