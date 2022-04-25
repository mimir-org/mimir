import { applyEdgeChanges, EdgeChange, Edge as FlowEdge, EdgeRemoveChange } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Edge, Project } from "../../../../models";
import { deleteEdge } from "../../../../redux/store/project/actions";
import { CloseInspector } from "../handlers/OnBlockSelectionChange";
import { HandleOffPageEdgeDelete } from "./helpers/HandleOffPageEdgeDelete";

/**
 * Hook that runs whenever an Edge has a change in BlockView.
 * In the Flow Library a change is defined by the following types:
 * EdgeSelectionChange | EdgeRemoveChange | EdgeAddChange | EdgeResetChange
 * If an edge is marked as remove, a separate validation is executed.
 * @param changes
 * @param setEdges
 * @param inspectorRef
 * @param project
 * @param dispatch
 */
const useOnEdgesChange = (
  changes: EdgeChange[],
  setEdges: React.Dispatch<React.SetStateAction<FlowEdge[]>>,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  dispatch: Dispatch
) => {
  if (!project) return;
  const verifiedFlowChanges = [] as EdgeChange[];
  const verfifiedMimirEdges = [] as Edge[];

  // Verify changes
  changes.forEach((c) => {
    if (c.type === "remove") {
      project.edges.forEach((e) => {
        if (ValidateEdgeRemoval(c, e)) {
          verfifiedMimirEdges.push(e);
          verifiedFlowChanges.push(c);
        }
      });
    } else verifiedFlowChanges.push(c);
  });

  // Execute all changes
  setEdges((e) => applyEdgeChanges(verifiedFlowChanges, e));
  if (verfifiedMimirEdges.length) DeleteMimirEdges(verfifiedMimirEdges, inspectorRef, project, dispatch);
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

/**
 * Function to delete the validated Mimir edges.
 * @param verifiedMimirEdges
 * @param inspectorRef
 * @param project
 * @param dispatch
 */
function DeleteMimirEdges(
  verifiedMimirEdges: Edge[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  dispatch: Dispatch
) {
  verifiedMimirEdges.forEach((edge) => {
    HandleOffPageEdgeDelete(edge, project, dispatch);
    dispatch(deleteEdge(edge.id));
  });

  CloseInspector(inspectorRef, dispatch);
}

export default useOnEdgesChange;
