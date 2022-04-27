import { applyEdgeChanges, EdgeChange, Edge as FlowEdge, EdgeRemoveChange } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Edge, Node } from "../../../../models";
import { useOnEdgeDelete } from "../../hooks/useOnEdgeDelete";

/**
 * Hook that runs whenever an Edge has a change in BlockView.
 * In the Flow Library a change is defined by the following types:
 * EdgeSelectionChange | EdgeRemoveChange | EdgeAddChange | EdgeResetChange
 * If an edge is marked as remove, a separate validation is executed.
 * @param changes
 * @param setEdges
 * @param inspectorRef
 * @param nodes
 * @param edges
 * @param dispatch
 */
const useOnEdgesChange = (
  changes: EdgeChange[],
  setEdges: React.Dispatch<React.SetStateAction<FlowEdge[]>>,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  nodes: Node[],
  edges: Edge[],
  dispatch: Dispatch
) => {
  const verifiedFlowChanges = [] as EdgeChange[];
  const verfifiedMimirEdges = [] as Edge[];

  // Verify changes
  changes.forEach((c) => {
    if (c.type === "remove") {
      edges.forEach((e) => {
        if (ValidateEdgeRemoval(c, e)) {
          verfifiedMimirEdges.push(e);
          verifiedFlowChanges.push(c);
        }
      });
    } else verifiedFlowChanges.push(c);
  });

  // Execute all changes
  setEdges((e) => applyEdgeChanges(verifiedFlowChanges, e));
  useOnEdgeDelete(verfifiedMimirEdges, nodes, edges, inspectorRef, dispatch);
};

/**
 * Function to verify if an edge is valid to be removed.
 * @param change
 * @param edge
 * @returns a boolean value.
 */
function ValidateEdgeRemoval(change: EdgeRemoveChange, edge: Edge) {
  if (edge.id === change.id) return !edge.isLocked;
  return false;
}

export default useOnEdgesChange;
