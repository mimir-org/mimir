import { applyEdgeChanges, EdgeChange, Edge as FlowEdge, EdgeRemoveChange, EdgeSelectionChange } from "react-flow-renderer";
import { Dispatch } from "redux";
// import { removeSelectedEdge, removeSelectedNode, setSelectedEdge } from "../../../../redux/store/project/actions";
import { OnEdgeDelete } from "../../handlers";
import { AspectObject, Connection, Project } from "lib";

/**
 * Hook that runs whenever an Edge has a change in BlockView.
 * In the Flow Library a change is defined by the following types:
 * EdgeSelectionChange | EdgeRemoveChange | EdgeAddChange | EdgeResetChange
 * If an edge is marked as selected, HandleSelect dispatches the edge to be selected.
 * If an edge is marked as removed, HandleRemove validates the changes and the component OnEdgeDelete handles the removal.
 * The other types of changes are executed automatically by the Flow framework.
 * @param project
 * @param changes
 * @param selectedBlockNode
 * @param selectedEdge
 * @param setEdges
 * @param inspectorRef
 * @param dispatch
 */
const useOnBlockEdgesChange = (
  project: Project,
  changes: EdgeChange[],
  selectedBlockNode: AspectObject,
  selectedEdge: Connection,
  setEdges: React.Dispatch<React.SetStateAction<FlowEdge[]>>,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch
) => {
  const edges = project.connections;
  const verifiedFlowChanges = [] as EdgeChange[];
  const edgesToDelete = [] as Connection[];

  // Verify changes
  changes.forEach((c) => {
    if (c.type === "select") return HandleSelect(c, selectedEdge, verifiedFlowChanges, dispatch);
    if (c.type === "remove")
      return HandleRemove(c, edges, selectedBlockNode, selectedEdge, verifiedFlowChanges, edgesToDelete, project);
    verifiedFlowChanges.push(c);
  });

  // Execute verified changes
  if (edgesToDelete.length) OnEdgeDelete(edgesToDelete, inspectorRef, project, dispatch);
  setEdges((e) => applyEdgeChanges(verifiedFlowChanges, e));
};

/**
 * Function to handle selection of an edge in BlockView.
 * @param change
 * @param selectedEdge
 * @param verifiedFlowChanges
 * @param dispatch
 */
function HandleSelect(
  change: EdgeSelectionChange,
  selectedEdge: Connection,
  verifiedFlowChanges: EdgeChange[],
  dispatch: Dispatch
) {
  if (change.id === selectedEdge?.id) return;
  // dispatch(removeSelectedEdge());
  // dispatch(removeSelectedNode());
  // dispatch(setSelectedEdge(change.id));
  verifiedFlowChanges.push(change);
}

/**
 * Function to handle removal of an edge. This function handles FlowEdges and MimirEdges separately.
 * A confirmed element to be deleted is added to both lists - verifiedFlowChanges and edgesToDelete.
 * @param change
 * @param edges
 * @param selectedBlockNode
 * @param selectedEdge
 * @param verifiedFlowChanges
 * @param edgesToDelete
 */
function HandleRemove(
  change: EdgeRemoveChange,
  edges: Connection[],
  selectedBlockNode: AspectObject,
  selectedEdge: Connection,
  verifiedFlowChanges: EdgeChange[],
  edgesToDelete: Connection[],
  project: Project
) {
  const edgeToRemove = edges.find((e) => e.id === change.id);
  if (!edgeToRemove) return;

  const isSelectedEdge = change.id === selectedEdge?.id;
  const [from, to] = project.getConnectionNodes(edgeToRemove);
  const isConnectedToSelectedBlockNode = from.id === selectedBlockNode?.id || to.id === selectedBlockNode?.id;

  if (!isConnectedToSelectedBlockNode && !isSelectedEdge) return;

  verifiedFlowChanges.push(change);
  edgesToDelete.push(edgeToRemove);
}

export default useOnBlockEdgesChange;
