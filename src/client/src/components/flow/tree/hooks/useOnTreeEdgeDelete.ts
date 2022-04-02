import { Edge as FlowEdge } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Project } from "../../../../models";
import { removeEdge } from "../../../../redux/store/project/actions";
import { CloseInspector } from "../../handlers";
import { FindMimirEdgeByFlowEdgeId } from "../../helpers";
import { IsAspectNode } from "../../../../helpers/Aspects";

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
    const selectedNode = project?.nodes?.find((n) => n.isSelected);
    if (IsAspectNode(selectedNode)) return;

    const edge = FindMimirEdgeByFlowEdgeId(project, flowEdge.id);
    if (edge?.isLocked) return;

    hasDeleted = true;
    dispatch(removeEdge(flowEdge.id));
  });

  if (hasDeleted) CloseInspector(inspectorRef, dispatch);
};

export default useOnTreeEdgeDelete;
