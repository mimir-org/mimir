import { Node as FlowNode } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Project } from "../../../../models";
import { deleteEdge, deleteNode } from "../../../../redux/store/project/actions";
import { IsAspectNode } from "../../../../helpers/Aspects";
import { GetMimirNodeByFlowNodeId } from "../../helpers/GetMimirDataByFlowId";
import { CloseInspector } from "../handlers";

/**
 * Hook that runs when a FlowNode is deleted from Mimir in TreeView.
 * If a node is deleted the connected edges are also deleted.
 * @param flowNodesToDelete
 
 * @param inspectorRef
 * @param project
 * @param dispatch
 */
const useOnTreeNodeDelete = (
  flowNodesToDelete: FlowNode[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  dispatch: Dispatch
) => {
  let hasDeleted = false;

  flowNodesToDelete.forEach((flowNode) => {
    if (IsAspectNode(flowNode.data)) return;

    const mimirNode = GetMimirNodeByFlowNodeId(project, flowNode.id);
    if (mimirNode?.isLocked) return;
    DeleteRelatedEdges(mimirNode.id, project, dispatch);

    hasDeleted = true;

    dispatch(deleteNode(mimirNode.id));
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

export default useOnTreeNodeDelete;
