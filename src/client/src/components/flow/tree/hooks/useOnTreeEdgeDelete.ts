import { Edge as FlowEdge } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Project } from "../../../../models";
import { deleteEdge } from "../../../../redux/store/project/actions";
import { IsAspectNode } from "../../../../helpers/Aspects";
import { CloseInspector } from "../handlers";

/**
 * Hook that runs when an FlowEdge is deleted from Mimir in TreeView.
 * @param flowEdgesToDelete
 * @param inspectorRef
 * @param project
 * @param dispatch
 */
const useOnTreeEdgeDelete = (
  flowEdgesToDelete: FlowEdge[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  dispatch: Dispatch
) => {
  let hasDeleted = false;

  flowEdgesToDelete.forEach((flowEdge) => {
    const selectedNode = project.nodes.find((n) => n.selected);
    if (IsAspectNode(selectedNode)) return;

    const edge = project.edges.find((e) => e.id === flowEdge.id);
    if (edge?.isLocked) return;

    dispatch(deleteEdge(edge.id));
    hasDeleted = true;
  });

  if (hasDeleted) CloseInspector(inspectorRef, dispatch);
};

export default useOnTreeEdgeDelete;
