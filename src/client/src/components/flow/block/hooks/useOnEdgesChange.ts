import { applyEdgeChanges, EdgeChange, Edge as FlowEdge } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Edge, Project } from "../../../../models";
import { useOnEdgeDelete } from ".";

/**
 * Hook that runs whenever an Edge has a change in BlockView.
 * In the Flow Library a change is defined by the following types:
 * EdgeSelectionChange | EdgeRemoveChange | EdgeAddChange | EdgeResetChange
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
  const mimirEdgesToDelete = [] as Edge[];

  changes.forEach((c) => {
    if (c.type === "remove") {
      project?.edges?.forEach((e) => {
        if (e.id === c.id) mimirEdgesToDelete.push(e);
      });
    }
  });

  setEdges((e) => applyEdgeChanges(changes, e));
  useOnEdgeDelete(mimirEdgesToDelete, inspectorRef, project, dispatch);
};

export default useOnEdgesChange;
