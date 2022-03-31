import { Edge as FlowEdge } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Project } from "../../../../models";
import { removeEdge } from "../../../../redux/store/project/actions";
import { FindMimirEdgeByFlowEdgeId } from "../../helpers";
import { IsAspectNode } from "../../../../helpers/Aspects";
import { CloseInspector } from "../../handlers";
import { GetSelectedNode } from "../../../../helpers/Selected";

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
  HandleDeleteEdges(flowEdgesToDelete, project, dispatch);
  CloseInspector(inspectorRef, dispatch);
};

function HandleDeleteEdges(flowEdges: FlowEdge[], project: Project, dispatch: Dispatch) {
  flowEdges.forEach((flowEdge) => {
    const selectedNode = GetSelectedNode();
    if (IsAspectNode(selectedNode)) return;

    const edge = FindMimirEdgeByFlowEdgeId(project, flowEdge);
    if (edge?.isLocked) return;

    dispatch(removeEdge(flowEdge.id));
  });
}

export default useOnEdgeDelete;
