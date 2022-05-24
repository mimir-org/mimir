import { applyEdgeChanges, EdgeChange, Edge as FlowEdge, EdgeRemoveChange, EdgeSelectionChange } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Edge, Node, Project } from "../../../../models";
import { removeSelectedNode, setSelectedEdge } from "../../../../redux/store/project/actions";
import { OnEdgeDelete } from "../../handlers";

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
const useOnBlockEdgesChange = (
  project: Project,
  changes: EdgeChange[],
  selectedBlockNode: Node,
  selectedEdge: Edge,
  setEdges: React.Dispatch<React.SetStateAction<FlowEdge[]>>,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch
) => {
  const nodes = project.nodes;
  const edges = project.edges;
  const verifiedFlowChanges = [] as EdgeChange[];
  const edgesToDelete = [] as Edge[];

  // Verify changes
  changes.forEach((c) => {
    if (c.type === "select") return HandleSelect(c, selectedEdge, verifiedFlowChanges, dispatch);
    if (c.type === "remove") return HandleRemove(c, edges, selectedBlockNode, selectedEdge, verifiedFlowChanges, edgesToDelete);
    verifiedFlowChanges.push(c);
  });

  // Execute verified changes
  setEdges((e) => applyEdgeChanges(verifiedFlowChanges, e));
  if (edgesToDelete.length) OnEdgeDelete(edgesToDelete, nodes, edges, inspectorRef, dispatch);
};

/**
 * Function to handle selection of an edge in BlockView.
 * @param change
 * @param selectedEdge
 * @param verifiedFlowChanges
 * @param dispatch
 */
function HandleSelect(change: EdgeSelectionChange, selectedEdge: Edge, verifiedFlowChanges: EdgeChange[], dispatch: Dispatch) {
  if (change.id === selectedEdge?.id) return;

  dispatch(removeSelectedNode());
  dispatch(setSelectedEdge(change.id));
  verifiedFlowChanges.push(change);
}

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
function HandleRemove(
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

export default useOnBlockEdgesChange;
