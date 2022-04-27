import { applyEdgeChanges, EdgeChange, Edge as FlowEdge, NodeRemoveChange } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Edge, Node, Project } from "../../../../models";
import { IsAspectNode } from "../../../../helpers/Aspects";
import { deleteEdge } from "../../../../redux/store/project/actions";
import { CloseInspector } from "../handlers";

/**
 * Hook that runs whenever an Edge has a change in TreeView.
 * In the Flow Library a change is defined by the following types:
 * EdgeSelectionChange | EdgeRemoveChange | EdgeAddChange | EdgeResetChange
 * If an edge is marked as removed, the function DeleteMimirEdges runs and handles the removal of Mimir edges.
 * @param project
 * @param selectedNode
 * @param changes
 * @param setEdges
 * @param dispatch
 * @param inspectorRef
 */
const useOnTreeEdgesChange = (
  project: Project,
  selectedNode: Node,
  changes: EdgeChange[],
  setEdges: React.Dispatch<React.SetStateAction<FlowEdge[]>>,
  dispatch: Dispatch,
  inspectorRef: React.MutableRefObject<HTMLDivElement>
) => {
  if (!project) return;
  const verifiedFlowChanges = [] as EdgeChange[];
  const mimirEdgesToDelete = [] as Edge[];

  // Verify changes
  changes.forEach((change) => {
    if (change.type === "remove")
      return HandleRemoveChange(change, verifiedFlowChanges, mimirEdgesToDelete, project, selectedNode);
    verifiedFlowChanges.push(change);
  });

  // Execute all changes
  setEdges((e) => applyEdgeChanges(verifiedFlowChanges, e));
  DeleteMimirEdges(mimirEdgesToDelete, inspectorRef, dispatch);
};

/**
 * Function to handle removal of an edge. This function handles FlowEdges and MimirEdges separately.
 * A confirmed element to be deleted is added to both lists - verifiedChanges and mimirEdgesToDelete.
 * @param change
 * @param verifiedChanges
 * @param mimirEdgesToDelete
 * @param project
 * @param selectedNode
 */
function HandleRemoveChange(
  change: NodeRemoveChange,
  verifiedChanges: EdgeChange[],
  mimirEdgesToDelete: Edge[],
  project: Project,
  selectedNode: Node
) {
  if (IsAspectNode(selectedNode)) return;

  const mimirEdge = project.edges?.find((n) => n.id === change.id);
  if (!mimirEdge || mimirEdge.isLocked) return;

  const fromNode = project.nodes.find((n) => n.id === mimirEdge.fromNodeId);
  const toNode = project.nodes.find((n) => n.id === mimirEdge.toNodeId);
  if (fromNode?.isLocked || toNode?.isLocked) return;

  mimirEdgesToDelete.push(mimirEdge);

  const removeChange = { id: change.id, type: "remove" } as EdgeChange;
  verifiedChanges.push(removeChange);
}

/**
 * Function to delete verified Mimir Edges. After the edges are deleted the Inspector closes.
 * @param edgesToDelete
 * @param inspectorRef
 * @param dispatch
 */
function DeleteMimirEdges(edgesToDelete: Edge[], inspectorRef: React.MutableRefObject<HTMLDivElement>, dispatch: Dispatch) {
  if (!edgesToDelete.length) return;

  edgesToDelete.forEach((edge) => {
    dispatch(deleteEdge(edge.id));
  });

  CloseInspector(inspectorRef, dispatch);
}

export default useOnTreeEdgesChange;
