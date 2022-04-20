import { Dispatch } from "redux";
import { Project, Edge } from "../../../../models";
import { deleteEdge } from "../../../../redux/store/project/actions";
import { HandleOffPageEdgeDelete } from "./helpers/HandleOffPageEdgeDelete";
import { CloseInspector } from "../handlers";

/**
 * Hook that runs when an edge is deleted from Mimir in BlockView.
 * @param mimirEdgesToDelete
 * @param inspectorRef
 * @param project
 * @param dispatch
 */
const useOnEdgeDelete = (
  mimirEdgesToDelete: Edge[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  dispatch: Dispatch
) => {
  let hasDeleted = false;

  mimirEdgesToDelete.forEach((edge) => {
    if (edge.isLocked) return;

    HandleOffPageEdgeDelete(edge, project, dispatch);

    hasDeleted = true;
    dispatch(deleteEdge(edge.id));
  });

  if (hasDeleted) CloseInspector(inspectorRef, dispatch);
};

export default useOnEdgeDelete;
