import { Edge as FlowEdge } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Project } from "../../../../models";
import { deleteEdge } from "../../../../redux/store/project/actions";
import { GetMimirEdgeByFlowEdgeId } from "../../helpers/GetMimirDataByFlowId";
import { IsAspectNode } from "../../../../helpers/Aspects";
import { CloseInspector } from "../../handlers";
import { HandleOffPageEdgeDelete } from "./helpers/HandleOffPageEdgeDelete";

/**
 * Hook that runs when an edge is deleted from Mimir in BlockView.
 * @param flowEdgesToDelete
 * @param inspectorRef
 * @param project
 * @param dispatch
 */
const useOnEdgeDelete = (
  flowEdgesToDelete: FlowEdge[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  dispatch: Dispatch
) => {
  let hasDeleted = false;

  flowEdgesToDelete.forEach((flowEdge) => {
    const selectedNode = project?.nodes?.find((n) => n.selected);
    if (IsAspectNode(selectedNode)) return;

    const edgeToDelete = GetMimirEdgeByFlowEdgeId(project, flowEdge.id);
    if (edgeToDelete?.isLocked) return;
    HandleOffPageEdgeDelete(edgeToDelete, project, dispatch);

    hasDeleted = true;
    dispatch(deleteEdge(flowEdge.id));
  });

  if (hasDeleted) CloseInspector(inspectorRef, dispatch);
};

export default useOnEdgeDelete;
