import { applyEdgeChanges, EdgeChange, Edge as FlowEdge, EdgeRemoveChange } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Edge, Node, Project } from "../../../../models";
import { useOnEdgeDelete } from "../../hooks/useOnEdgeDelete";

/**
 * Hook that runs whenever an Edge has a change in BlockView.
 * In the Flow Library a change is defined by the following types:
 * EdgeSelectionChange | EdgeRemoveChange | EdgeAddChange | EdgeResetChange
 * If an edge is marked as remove, a separate validation is executed.
 * @param project
 * @param changes
 * @param selectedBlockNode
 * @param selectedEdge
 * @param setEdges
 * @param inspectorRef
 * @param dispatch
 */
const useOnEdgesChange = (
  project: Project,
  changes: EdgeChange[],
  selectedBlockNode: Node,
  selectedEdge: Edge,
  setEdges: React.Dispatch<React.SetStateAction<FlowEdge[]>>,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch
) => {
  const verifiedFlowChanges = [] as EdgeChange[];
  const verfifiedMimirEdges = [] as Edge[];

  // Verify changes
  changes.forEach((c) => {
    if (c.type === "remove")
      return HandleRemoveEdge(c, project.edges, selectedBlockNode, selectedEdge, verifiedFlowChanges, verfifiedMimirEdges);
    verifiedFlowChanges.push(c);
  });

  // Execute all changes
  setEdges((e) => applyEdgeChanges(verifiedFlowChanges, e));
  useOnEdgeDelete(verfifiedMimirEdges, project.nodes, project.edges, inspectorRef, dispatch);
};

/**
 * Function to handle removal of an edge. This function handles FlowEdges and MimirEdges separately.
 * A confirmed element to be deleted is added to both lists - flowChanges and mimirEdgesToDelete.
 * @param change
 * @param edges
 * @param selectedBlockNode
 * @param selectedEdge
 * @param verifiedFlowChanges
 * @param verfifiedMimirEdges
 */
function HandleRemoveEdge(
  change: EdgeRemoveChange,
  edges: Edge[],
  selectedBlockNode: Node,
  selectedEdge: Edge,
  verifiedFlowChanges: EdgeChange[],
  verfifiedMimirEdges: Edge[]
) {
  const edgeToRemove = edges.find((e) => e.id === change.id);
  if (!edgeToRemove || edgeToRemove.isLocked) return;

  const isSelectedEdge = change.id === selectedEdge?.id;
  const isConnectedToSelectedBlockNode =
    edgeToRemove.fromNodeId === selectedBlockNode?.id || edgeToRemove.toNodeId === selectedBlockNode?.id;

  if (!isConnectedToSelectedBlockNode && !isSelectedEdge) return;

  verifiedFlowChanges.push(change);
  verfifiedMimirEdges.push(edgeToRemove);
}

export default useOnEdgesChange;
