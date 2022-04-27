import { applyNodeChanges, NodeChange, Node as FlowNode, NodeRemoveChange } from "react-flow-renderer";
import { Dispatch } from "redux";
import { IsAspectNode } from "../../../../helpers/Aspects";
import { Project, Node, Edge } from "../../../../models";
import { deleteEdge, deleteNode } from "../../../../redux/store/project/actions";
import { IsEdgeConnectedToNode } from "../../helpers/IsEdgeConnectedToNode";
import { CloseInspector } from "../handlers";

/**
 * Hook that runs whenever a Node has a change in TreeView.
 * In the Flow Library a change is defined by the following types:
 * NodeDimensionChange | NodePositionChange | NodeSelectionChange | NodeRemoveChange | NodeAddChange | NodeResetChange
 * If a node is marked as removed, the function DeleteMimirNodes runs and handles removal of Mimir nodes and edges.
 * @param project
 * @param changes
 * @param setNodes
 * @param dispatch
 * @param inspectorRef
 */
const useOnTreeNodesChange = (
  project: Project,
  changes: NodeChange[],
  setNodes: React.Dispatch<React.SetStateAction<FlowNode[]>>,
  dispatch: Dispatch,
  inspectorRef: React.MutableRefObject<HTMLDivElement>
) => {
  if (!project) return;
  const verifiedFlowChanges = [] as NodeChange[];
  const mimirNodesToDelete = [] as Node[];

  // Verify changes
  changes.forEach((change) => {
    if (change.type === "remove") return HandleRemoveChange(change, verifiedFlowChanges, mimirNodesToDelete, project.nodes);
    verifiedFlowChanges.push(change);
  });

  // Execute all changes
  setNodes((n) => applyNodeChanges(changes, n));
  DeleteMimirNodes(mimirNodesToDelete, inspectorRef, project.edges, dispatch);
};

/**
 * Function to handle removal of a node. This function handles FlowNodes and MimirNodes separately.
 * A confirmed element to be deleted is added to both lists - flowChanges and mimirNodesToDelete.
 * @param change
 * @param verifiedChanges
 * @param mimirNodesToDelete
 * @param nodes
 */
function HandleRemoveChange(change: NodeRemoveChange, verifiedChanges: NodeChange[], mimirNodesToDelete: Node[], nodes: Node[]) {
  const mimirNode = nodes?.find((n) => n.id === change.id);
  if (!mimirNode || IsAspectNode(mimirNode) || mimirNode.isLocked) return;

  mimirNodesToDelete.push(mimirNode);

  const removeChange = { id: change.id, type: "remove" } as NodeChange;
  verifiedChanges.push(removeChange);
}

/**
 * Function to delete verified Mimir Nodes. After the nodes are deleted the Inspector closes.
 * @param nodesToDelete
 * @param inspectorRef
 * @param edges
 * @param dispatch
 */
function DeleteMimirNodes(
  nodesToDelete: Node[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  edges: Edge[],
  dispatch: Dispatch
) {
  if (!nodesToDelete.length) return;

  nodesToDelete.forEach((node) => {
    DeleteRelatedEdges(node.id, edges, dispatch);
    dispatch(deleteNode(node.id));
  });

  CloseInspector(inspectorRef, dispatch);
}

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

export default useOnTreeNodesChange;
