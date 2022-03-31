import { Node as FlowNode } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Project, Node } from "../../../../models";
import { removeEdge, removeNode } from "../../../../redux/store/project/actions";
import { IsAspectNode } from "../../../../helpers/Aspects";
import { CloseInspector } from "../../handlers";
import { FindMimirNodeByFlowNodeId } from "../../helpers";

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
  HandleDeleteNodes(flowNodesToDelete, project, dispatch);

  CloseInspector(inspectorRef, dispatch);
};

function HandleDeleteNodes(flowNodes: FlowNode[], project: Project, dispatch: Dispatch) {
  flowNodes.forEach((flowNode) => {
    if (IsAspectNode(flowNode.data)) return;

    const mimirNode = FindMimirNodeByFlowNodeId(project, flowNode);
    if (mimirNode?.isLocked) return;

    DeleteRelatedEdges(mimirNode, project, dispatch);
    dispatch(removeNode(mimirNode.id));
  });
}

/**
 * Function to delete all edges related to a node that is to be deleted.
 * Note: the edges must be deleted before the node.
 * @param node
 * @param project
 * @param dispatch
 */
function DeleteRelatedEdges(node: Node, project: Project, dispatch: Dispatch) {
  project.edges.forEach((edge) => {
    if (edge.fromNodeId === node.id || edge.toNodeId === node.id) dispatch(removeEdge(edge.id));
  });
}

export default useOnTreeNodeDelete;
